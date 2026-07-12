import { useSSO, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthTextField } from "@/components/AuthTextField";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { clerkErrorMessage } from "@/lib/clerkError";

export default function SignUp() {
  const router = useRouter();
  const { signUp, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim());
  const validatePassword = (value: string) => value.length >= 8;

  // Create the account with email + password, then send the email
  // verification code and open the code sheet.
  const handleStartVerification = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError("");

    const { error: signUpError } = await signUp.password({
      emailAddress: email.trim(),
      password,
    });
    if (signUpError) {
      setError(
        clerkErrorMessage(
          signUpError,
          "We couldn't create your account. Please try again.",
        ),
      );
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(
        clerkErrorMessage(
          sendError,
          "We couldn't send a verification code. Please try again.",
        ),
      );
      return;
    }

    setShowVerify(true);
  };

  // Verify the emailed code. On success, activate the session (finalize)
  // and let the caller navigate home.
  const handleVerification = async (code: string): Promise<boolean> => {
    setError("");

    const { error: verifyError } = await signUp.verifications.verifyEmailCode({
      code,
    });
    if (verifyError) {
      setError(
        clerkErrorMessage(
          verifyError,
          "We couldn't verify that code. Please try again.",
        ),
      );
      return false;
    }

    if (signUp.status === "complete") {
      await signUp.finalize();
      return true;
    }

    setError("We couldn't verify your account. Please try again.");
    return false;
  };

  // Browser-based social sign-in, shared by Google / Facebook / Apple.
  const handleSSO = async (
    strategy: "oauth_google" | "oauth_facebook" | "oauth_apple",
  ) => {
    try {
      setError("");
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      // No session and no error means the user dismissed the browser — stay put.
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      setError("Social sign-in didn't complete. Please try again.");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="screen"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            className="pt-2 pb-4 self-start"
          >
            <Ionicons name="chevron-back" size={26} color="#0D132B" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text-h1 text-ink">Create your account</Text>
          <Text className="text-body-lg text-muted mt-2">
            Start your language journey today ✨
          </Text>

          {/* Mascot */}
          <Image
            source={images.mascotAuth}
            resizeMode="contain"
            className="w-40 h-40 self-center my-4"
          />

          {/* Fields */}
          <View className="gap-4">
            <AuthTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              keyboardType="email-address"
            />
            <AuthTextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••"
              secure
            />
          </View>

          {/* Primary action */}
          <TouchableOpacity
            className="btn--primary mt-6"
            activeOpacity={0.9}
            disabled={fetchStatus === "fetching"}
            style={fetchStatus === "fetching" ? { opacity: 0.6 } : undefined}
            onPress={() => void handleStartVerification()}
          >
            <Text className="btn__label">Sign Up</Text>
          </TouchableOpacity>

          {error ? (
            <Text className="text-body-sm text-red-500 mt-3">{error}</Text>
          ) : null}

          {/* Social auth — Google / Facebook / Apple via browser SSO */}
          <View className="mt-6">
            <SocialAuthButtons
              onPressGoogle={() => void handleSSO("oauth_google")}
              onPressFacebook={() => void handleSSO("oauth_facebook")}
              onPressApple={() => void handleSSO("oauth_apple")}
            />
          </View>

          {/* Required for sign-up — Clerk's bot protection mounts here (invisible) */}
          <View nativeID="clerk-captcha" />

          {/* Footer */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-body-md text-muted">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className="text-body-md text-lingua-purple font-poppins-semibold">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showVerify}
        email={email}
        error={error}
        onClose={() => setShowVerify(false)}
        onComplete={async (code) => {
          const verified = await handleVerification(code);
          if (verified) {
            setShowVerify(false);
            router.replace("/");
          }
          return verified;
        }}
      />
    </SafeAreaView>
  );
}

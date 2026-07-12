import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/images";

type SocialAuthButtonsProps = {
  onPressGoogle?: () => void;
  onPressFacebook?: () => void;
  onPressApple?: () => void;
};

/** A single bordered provider button: icon pinned left, label centered. */
function SocialButton({
  icon,
  label,
  onPress,
  disabled = false,
}: {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.8}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={`relative rounded-2xl border border-border py-4 items-center justify-center ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <View className="absolute left-5">{icon}</View>
      <Text className="text-h4 text-ink">{label}</Text>
    </TouchableOpacity>
  );
}

/**
 * "or continue with" divider followed by the Google / Facebook / Apple
 * social auth buttons. UI only — no auth wiring yet.
 */
export function SocialAuthButtons({
  onPressGoogle,
  onPressFacebook,
  onPressApple,
}: SocialAuthButtonsProps) {
  return (
    <View className="gap-4">
      {/* Divider */}
      <View className="flex-row items-center gap-3">
        <View className="flex-1 h-px bg-border" />
        <Text className="text-body-md text-muted">or continue with</Text>
        <View className="flex-1 h-px bg-border" />
      </View>

      <SocialButton
        icon={
          <Image
            source={images.googleLogo}
            style={{ width: 22, height: 22 }}
            contentFit="contain"
          />
        }
        label="Continue with Google"
        onPress={onPressGoogle}
        disabled={!onPressGoogle}
      />
      <SocialButton
        icon={<Ionicons name="logo-facebook" size={22} color="#1877F2" />}
        label="Continue with Facebook"
        onPress={onPressFacebook}
        disabled={!onPressFacebook}
      />
      <SocialButton
        icon={<Ionicons name="logo-apple" size={22} color="#0D132B" />}
        label="Continue with Apple"
        onPress={onPressApple}
        disabled={!onPressApple}
      />
    </View>
  );
}

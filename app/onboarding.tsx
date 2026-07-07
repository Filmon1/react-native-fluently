import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";

/**
 * A rounded speech bubble with a small tail, floated over the mascot.
 * Only the drop shadow (platform-specific) and the tail's rotate transform
 * live in inline styles — everything else uses NativeWind classes.
 */
function SpeechBubble({
  label,
  bubbleClassName,
  textClassName,
  italic = false,
}: {
  label: string;
  bubbleClassName: string;
  textClassName: string;
  italic?: boolean;
}) {
  return (
    <View
      className={`rounded-2xl px-4 py-2 ${bubbleClassName}`}
      style={{
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <Text className={`text-h3 ${textClassName}${italic ? " italic" : ""}`}>
        {label}
      </Text>
      {/* Tail */}
      <View
        className={`absolute w-3.5 h-3.5 ${bubbleClassName}`}
        style={{ bottom: -5, left: 18, transform: [{ rotate: "45deg" }] }}
      />
    </View>
  );
}

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 px-6">
        {/* Logo */}
        <View className="flex-row items-center justify-center gap-2 pt-4 pb-2">
          <Image
            source={images.mascotLogo}
            resizeMode="contain"
            className="w-10 h-10"
          />
          <Text className="font-poppins-bold text-[26px] text-ink">
            Fluently
          </Text>
        </View>

        {/* Heading */}
        <View className="mt-8">
          <Text className="text-h1 text-ink">
            Your AI language{"\n"}
            <Text className="text-h1 text-lingua-purple">teacher</Text>
            <Text className="text-h1 text-ink">.</Text>
          </Text>
          <Text className="text-body-lg text-muted mt-4">
            Real conversations, personalized lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot + speech bubbles */}
        <View className="flex-1 relative mt-4">
          <Image
            source={images.mascotWelcome}
            resizeMode="contain"
            className="w-full h-full"
          />

          <View className="absolute top-[6%] left-[4%]">
            <SpeechBubble
              label="Hello!"
              bubbleClassName="bg-[#EDEBFB]"
              textClassName="text-ink"
            />
          </View>

          <View className="absolute top-0 right-[8%]">
            <SpeechBubble
              label="¡Hola!"
              bubbleClassName="bg-[#E6EEFF]"
              textClassName="text-lingua-deep-purple"
              italic
            />
          </View>

          <View className="absolute top-[24%] right-0">
            <SpeechBubble
              label="你好!"
              bubbleClassName="bg-[#FBE7E1]"
              textClassName="text-error"
              italic
            />
          </View>
        </View>

        {/* Get Started button */}
        <TouchableOpacity
          className="btn--primary flex-row items-center justify-center mb-4 mt-2"
          activeOpacity={0.9}
          onPress={() => router.back()}
        >
          <Text className="btn__label">Get Started</Text>
          <View className="absolute right-6">
            <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

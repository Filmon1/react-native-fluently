import { useAuth } from "@clerk/expo";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getLanguage } from "@/data/languages";
import type { LanguageCode } from "@/types/learning";

export default function Index() {
  const router = useRouter();
  const { isSignedIn, isLoaded, signOut } = useAuth();

  // Language chosen on the selection screen, forwarded via route params.
  const { language } = useLocalSearchParams<{ language?: LanguageCode }>();
  const selectedLanguage = language ? getLanguage(language) : undefined;

  // Wait for Clerk to restore the session before deciding where to go.
  if (!isLoaded) {
    return null;
  }

  // Not authenticated → show the onboarding flow.
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Authenticated → show the home screen.
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="screen"
        contentContainerStyle={{ padding: 24, gap: 24 }}
      >
        {/* Typography scale */}
        <View className="gap-2">
          <Text className="text-caption text-muted">DESIGN SYSTEM</Text>
          <Text className="text-h1 text-ink">Fluently</Text>
          <Text className="text-body-md text-muted">
            Poppins type scale + brand palette, wired through NativeWind.
          </Text>
        </View>

        {/* Currently selected language, forwarded from the picker */}
        {selectedLanguage && (
          <View className="card--surface gap-1">
            <Text className="text-caption text-muted">LEARNING</Text>
            <Text className="text-h3 text-ink">{selectedLanguage.name}</Text>
          </View>
        )}

        {/* Navigate to the language selection screen */}
        <TouchableOpacity
          className="btn--primary"
          activeOpacity={0.9}
          onPress={() => router.push("/language")}
        >
          <Text className="btn__label">
            {selectedLanguage ? "Change language" : "Choose a language"}
          </Text>
        </TouchableOpacity>

        {/* Sign out — the home guard then redirects back to onboarding */}
        <TouchableOpacity
          className="card card--surface items-center"
          activeOpacity={0.9}
          onPress={() => void signOut()}
        >
          <Text className="text-h4 text-muted">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
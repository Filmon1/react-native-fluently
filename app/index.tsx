import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isSignedIn, isLoaded, signOut } = useAuth();

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

        {/* Sign out — the home guard then redirects back to onboarding */}
        <TouchableOpacity
          className="btn--primary"
          activeOpacity={0.9}
          onPress={() => void signOut()}
        >
          <Text className="btn__label">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
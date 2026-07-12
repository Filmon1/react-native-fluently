import "../global.css";

import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { fonts } from "@/theme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file. Get it from the Clerk Dashboard → API keys.",
  );
}

// Keep the splash screen visible until the Poppins fonts are ready.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Render nothing until fonts load so text never flashes in a fallback font.
  if (!loaded && !error) {
    return null;
  }

  // ClerkProvider makes the session/user available to every screen and hook.
  // `tokenCache` persists the session in the device keychain so it survives restarts.
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
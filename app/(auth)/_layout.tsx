import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

/**
 * Guards the sign-in / sign-up screens. Signed-in users are sent to the
 * home route so they can't land back on the auth flow.
 */
export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to restore the session before deciding where to go.
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

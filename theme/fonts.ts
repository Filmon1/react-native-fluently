/**
 * Font asset map for `useFonts` (expo-font).
 *
 * The keys are the family names referenced everywhere else in the design
 * system (global.css @theme + theme/typography.ts), so they must stay in sync.
 */
export const fonts = {
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
} as const;
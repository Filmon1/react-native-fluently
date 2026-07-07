/**
 * Design system colors.
 *
 * Mirror of the color tokens defined in `global.css` (@theme).
 * Use the NativeWind classes (e.g. `bg-lingua-purple`, `text-ink`) for styling.
 * Use this object only where a raw color value is required — StyleSheet,
 * inline styles, status bar, gradients, chart libs, etc.
 */
export const colors = {
  /* Brand / Primary */
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  /* Semantic */
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  /* Neutrals */
  textPrimary: "#0D132B", // ink
  textSecondary: "#6B7280", // muted
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export type ColorToken = keyof typeof colors;
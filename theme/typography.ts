/**
 * Design system typography (Poppins).
 *
 * Mirror of the typography utilities in `global.css`
 * (`text-h1`, `text-h2`, ... `text-caption`).
 * Prefer the NativeWind classes in JSX; use these objects only where a raw
 * text style is required (StyleSheet, animated text, third-party components).
 */

/** Loaded font family names — must match the keys passed to `useFonts`. */
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const typography = {
  /* H1 — Page / Screen Title — 32 / Bold / 1.2 */
  h1: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 38 },
  /* H2 — Section Title — 24 / SemiBold / 1.3 */
  h2: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 31 },
  /* H3 — Card / Module Title — 20 / SemiBold / 1.3 */
  h3: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 26 },
  /* H4 — Subheading — 16 / Medium / 1.4 */
  h4: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 22 },
  /* Body Large — Important content — 16 / Regular / 1.6 */
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 26 },
  /* Body Medium — Body text — 14 / Regular / 1.6 */
  bodyMedium: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 22 },
  /* Body Small — Supporting text — 13 / Regular / 1.6 */
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 21 },
  /* Caption — Labels, meta text — 11 / Regular / 1.4 */
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 15 },
} as const;

export type TypographyVariant = keyof typeof typography;
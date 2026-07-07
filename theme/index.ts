/**
 * Design system tokens.
 *
 * Single source of truth for JS/TS access to the design system. The matching
 * NativeWind utilities live in `global.css` — prefer those in JSX and only
 * reach for these tokens where raw style values are required.
 */
export { colors } from "./colors";
export type { ColorToken } from "./colors";

export { typography, fontFamily } from "./typography";
export type { TypographyVariant } from "./typography";

export { fonts } from "./fonts";
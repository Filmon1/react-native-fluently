// Supported languages for the app.
//
// To add a language: add its code to `LanguageCode` in `types/learning.ts`,
// add an entry here, then create matching units in `data/units.ts` and lessons
// in `data/lessons.ts`.

import type { Language, LanguageCode } from "@/types/learning";

export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "https://flagcdn.com/w320/es.png",
    description: "Spoken across Spain and Latin America.",
    learners: "28.4M",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "https://flagcdn.com/w320/fr.png",
    description: "The language of France, Canada, and more.",
    learners: "19.4M",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "https://flagcdn.com/w320/de.png",
    description: "Spoken in Germany, Austria, and Switzerland.",
    learners: "8.1M",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "https://flagcdn.com/w320/jp.png",
    description: "Spoken in Japan by over 120 million people.",
    learners: "12.7M",
  },
];

/** Look up a single language by its code. */
export function getLanguage(code: LanguageCode): Language | undefined {
  return languages.find((language) => language.code === code);
}

// Units: themed groups of lessons, one set per language.
//
// Each unit references its lessons by id (see `data/lessons.ts`). Keep units
// ordered with the `order` field so screens can render them predictably.

import type { LanguageCode, Unit } from "@/types/learning";

export const units: Unit[] = [
  // ── Spanish ──────────────────────────────────────────────────────────────
  {
    id: "es-basics",
    languageCode: "es",
    title: "Basics",
    description: "Your first Spanish words and greetings.",
    level: "beginner",
    order: 1,
    icon: "👋",
    lessonIds: ["es-greetings", "es-numbers"],
  },
  // ── French ───────────────────────────────────────────────────────────────
  {
    id: "fr-basics",
    languageCode: "fr",
    title: "Basics",
    description: "Start speaking French from day one.",
    level: "beginner",
    order: 1,
    icon: "👋",
    lessonIds: ["fr-greetings"],
  },
  // ── German ───────────────────────────────────────────────────────────────
  {
    id: "de-basics",
    languageCode: "de",
    title: "Basics",
    description: "Say your first words in German.",
    level: "beginner",
    order: 1,
    icon: "👋",
    lessonIds: ["de-greetings"],
  },
];

/** Get all units for a language, sorted by their `order`. */
export function getUnitsForLanguage(code: LanguageCode): Unit[] {
  return units
    .filter((unit) => unit.languageCode === code)
    .sort((a, b) => a.order - b.order);
}

/** Look up a single unit by its id. */
export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

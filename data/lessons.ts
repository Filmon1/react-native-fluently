// Lessons: the actual learning content.
//
// A lesson belongs to one unit and is made of ordered activities. Activities
// can be vocabulary drills, phrase practice, or AI teacher sessions (chat now,
// audio/video Vision Agent later). The `aiTeacher` prompts are ready for a
// backend to send to the model — the app itself never calls the model.
//
// This is a small, beginner-friendly sample. Add more lessons by following the
// same shape and wiring their ids into `data/units.ts`.

import type { Lesson, LanguageCode } from "@/types/learning";

export const lessons: Lesson[] = [
  // ── Spanish · Greetings ────────────────────────────────────────────────────
  {
    id: "es-greetings",
    languageCode: "es",
    unitId: "es-basics",
    title: "Greetings",
    description: "Say hello, goodbye, and introduce yourself.",
    order: 1,
    xp: 10,
    goals: [
      { id: "es-greetings-g1", label: "Greet someone in Spanish" },
      { id: "es-greetings-g2", label: "Say goodbye politely" },
    ],
    activities: [
      {
        id: "es-greetings-vocab",
        type: "vocabulary",
        title: "New words",
        instruction: "Learn these greeting words.",
        vocabulary: [
          {
            id: "es-hola",
            term: "hola",
            translation: "hello",
            pronunciation: "OH-lah",
            example: "¡Hola! ¿Cómo estás?",
          },
          {
            id: "es-adios",
            term: "adiós",
            translation: "goodbye",
            pronunciation: "ah-DYOHS",
            example: "Adiós, hasta mañana.",
          },
          {
            id: "es-gracias",
            term: "gracias",
            translation: "thank you",
            pronunciation: "GRAH-syahs",
          },
        ],
      },
      {
        id: "es-greetings-phrases",
        type: "phrase",
        title: "Useful phrases",
        instruction: "Practice saying these out loud.",
        phrases: [
          {
            id: "es-como-estas",
            text: "¿Cómo estás?",
            translation: "How are you?",
            pronunciation: "KOH-moh es-TAHS",
            context: "greeting a friend",
          },
          {
            id: "es-me-llamo",
            text: "Me llamo...",
            translation: "My name is...",
            pronunciation: "meh YAH-moh",
            context: "introducing yourself",
          },
        ],
      },
      {
        id: "es-greetings-chat",
        type: "chat",
        title: "Practice with your AI tutor",
        instruction: "Have a short greeting conversation.",
        aiTeacher: {
          system:
            "You are a warm, patient Spanish tutor for absolute beginners. " +
            "Speak mostly in simple Spanish, keep sentences short, and give a " +
            "quick English hint in parentheses when you introduce a new word. " +
            "Gently correct mistakes and keep the conversation encouraging.",
          greeting: "¡Hola! Me llamo Profe. ¿Cómo te llamas?",
          objectives: [
            "Get the learner to greet you in Spanish",
            "Have the learner say their name using 'Me llamo...'",
            "End by saying goodbye with 'adiós'",
          ],
        },
      },
    ],
  },

  // ── Spanish · Numbers ──────────────────────────────────────────────────────
  {
    id: "es-numbers",
    languageCode: "es",
    unitId: "es-basics",
    title: "Numbers 1–5",
    description: "Count from one to five in Spanish.",
    order: 2,
    xp: 10,
    goals: [{ id: "es-numbers-g1", label: "Count from 1 to 5 in Spanish" }],
    activities: [
      {
        id: "es-numbers-vocab",
        type: "vocabulary",
        title: "Numbers",
        instruction: "Learn the numbers one to five.",
        vocabulary: [
          { id: "es-uno", term: "uno", translation: "one", pronunciation: "OO-noh" },
          { id: "es-dos", term: "dos", translation: "two", pronunciation: "dohs" },
          { id: "es-tres", term: "tres", translation: "three", pronunciation: "trehs" },
          {
            id: "es-cuatro",
            term: "cuatro",
            translation: "four",
            pronunciation: "KWAH-troh",
          },
          {
            id: "es-cinco",
            term: "cinco",
            translation: "five",
            pronunciation: "SEEN-koh",
          },
        ],
      },
    ],
  },

  // ── French · Greetings ─────────────────────────────────────────────────────
  {
    id: "fr-greetings",
    languageCode: "fr",
    unitId: "fr-basics",
    title: "Greetings",
    description: "Say hello and goodbye in French.",
    order: 1,
    xp: 10,
    goals: [
      { id: "fr-greetings-g1", label: "Greet someone in French" },
      { id: "fr-greetings-g2", label: "Say thank you" },
    ],
    activities: [
      {
        id: "fr-greetings-vocab",
        type: "vocabulary",
        title: "New words",
        instruction: "Learn these greeting words.",
        vocabulary: [
          {
            id: "fr-bonjour",
            term: "bonjour",
            translation: "hello",
            pronunciation: "bon-ZHOOR",
            example: "Bonjour, ça va ?",
          },
          {
            id: "fr-au-revoir",
            term: "au revoir",
            translation: "goodbye",
            pronunciation: "oh ruh-VWAHR",
          },
          {
            id: "fr-merci",
            term: "merci",
            translation: "thank you",
            pronunciation: "mair-SEE",
          },
        ],
      },
      {
        id: "fr-greetings-chat",
        type: "chat",
        title: "Practice with your AI tutor",
        instruction: "Have a short greeting conversation.",
        aiTeacher: {
          system:
            "You are a friendly, patient French tutor for absolute beginners. " +
            "Speak in simple French with short sentences, and add a brief " +
            "English hint in parentheses for new words. Encourage the learner " +
            "and gently correct pronunciation and spelling.",
          greeting: "Bonjour ! Je m'appelle Prof. Comment tu t'appelles ?",
          objectives: [
            "Get the learner to greet you with 'bonjour'",
            "Have the learner introduce themselves",
            "End by saying 'au revoir'",
          ],
        },
      },
    ],
  },

  // ── German · Greetings ─────────────────────────────────────────────────────
  {
    id: "de-greetings",
    languageCode: "de",
    unitId: "de-basics",
    title: "Greetings",
    description: "Say hello and goodbye in German.",
    order: 1,
    xp: 10,
    goals: [
      { id: "de-greetings-g1", label: "Greet someone in German" },
      { id: "de-greetings-g2", label: "Say thank you" },
    ],
    activities: [
      {
        id: "de-greetings-vocab",
        type: "vocabulary",
        title: "New words",
        instruction: "Learn these greeting words.",
        vocabulary: [
          {
            id: "de-hallo",
            term: "hallo",
            translation: "hello",
            pronunciation: "HAH-loh",
            example: "Hallo! Wie geht's?",
          },
          {
            id: "de-tschuss",
            term: "tschüss",
            translation: "bye",
            pronunciation: "CHOOSS",
          },
          {
            id: "de-danke",
            term: "danke",
            translation: "thank you",
            pronunciation: "DAHN-kuh",
          },
        ],
      },
      {
        id: "de-greetings-chat",
        type: "chat",
        title: "Practice with your AI tutor",
        instruction: "Have a short greeting conversation.",
        aiTeacher: {
          system:
            "You are a kind, patient German tutor for absolute beginners. " +
            "Use simple German and short sentences, with a quick English hint " +
            "in parentheses for new words. Keep the tone encouraging and " +
            "gently correct mistakes.",
          greeting: "Hallo! Ich heiße Lehrer. Wie heißt du?",
          objectives: [
            "Get the learner to greet you with 'hallo'",
            "Have the learner say their name using 'Ich heiße...'",
            "End by saying 'tschüss'",
          ],
        },
      },
    ],
  },

  // ── Japanese · Greetings ───────────────────────────────────────────────────
  {
    id: "ja-greetings",
    languageCode: "ja",
    unitId: "ja-basics",
    title: "Greetings",
    description: "Say hello and goodbye in Japanese.",
    order: 1,
    xp: 10,
    goals: [
      { id: "ja-greetings-g1", label: "Greet someone in Japanese" },
      { id: "ja-greetings-g2", label: "Say thank you" },
    ],
    activities: [
      {
        id: "ja-greetings-vocab",
        type: "vocabulary",
        title: "New words",
        instruction: "Learn these greeting words.",
        vocabulary: [
          {
            id: "ja-konnichiwa",
            term: "こんにちは",
            translation: "hello",
            pronunciation: "kohn-nee-chee-wah",
            example: "こんにちは！げんきですか？",
          },
          {
            id: "ja-sayonara",
            term: "さようなら",
            translation: "goodbye",
            pronunciation: "sah-YOH-nah-rah",
          },
          {
            id: "ja-arigato",
            term: "ありがとう",
            translation: "thank you",
            pronunciation: "ah-ree-gah-TOH",
          },
        ],
      },
      {
        id: "ja-greetings-chat",
        type: "chat",
        title: "Practice with your AI tutor",
        instruction: "Have a short greeting conversation.",
        aiTeacher: {
          system:
            "You are a warm, patient Japanese tutor for absolute beginners. " +
            "Use simple Japanese with short sentences, and add a quick English " +
            "hint in parentheses for new words. Keep the tone encouraging and " +
            "gently correct mistakes.",
          greeting: "こんにちは！せんせいです。おなまえは？",
          objectives: [
            "Get the learner to greet you with 'こんにちは'",
            "Have the learner say their name",
            "Have the learner thank you with 'ありがとう'",
            "End by saying 'さようなら'",
          ],
        },
      },
    ],
  },
];

/** Look up a single lesson by its id. */
export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

/** Get every lesson for a language, sorted by their `order`. */
export function getLessonsForLanguage(code: LanguageCode): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageCode === code)
    .sort((a, b) => a.order - b.order);
}

/** Get the lessons in a unit, in the order defined by the unit. */
export function getLessonsForUnit(lessonIds: string[]): Lesson[] {
  return lessonIds
    .map((id) => getLesson(id))
    .filter((lesson): lesson is Lesson => lesson !== undefined);
}

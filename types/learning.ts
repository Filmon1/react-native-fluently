// Core content types for the learning system.
//
// The content is intentionally hardcoded (see AGENTS.md — no database for this
// version). These types describe the full shape of a course so the data files
// stay honest and are easy to extend later:
//
//   Language → Unit → Lesson → Activity
//
// Keep this file focused on *types only*. Actual content lives in
// `data/languages.ts`, `data/units.ts`, and `data/lessons.ts`.

/**
 * Supported language identifiers. Add a new code here first, then a matching
 * `Language` entry in `data/languages.ts`.
 */
export type LanguageCode = "es" | "fr" | "de" | "ja";

/** A language the user can learn. */
export type Language = {
  /** Stable id used to link units/lessons to a language. */
  code: LanguageCode;
  /** English name shown in most of the UI, e.g. "Spanish". */
  name: string;
  /** Native name shown alongside the flag, e.g. "Español". */
  nativeName: string;
  /** URL to the flag image shown next to the language. */
  flag: string;
  /** Short, friendly one-liner for the language picker. */
  description: string;
  /** Learner count shown in the picker, e.g. "28.4M". */
  learners: string;
};

/** Difficulty level for a unit or lesson. Extend as the course grows. */
export type Level = "beginner" | "intermediate" | "advanced";

/**
 * A themed group of lessons (e.g. "Basics", "Greetings"). Units belong to a
 * single language and are ordered by `order`.
 */
export type Unit = {
  id: string;
  /** Which language this unit belongs to. */
  languageCode: LanguageCode;
  title: string;
  description: string;
  level: Level;
  /** Sort order within the language (1-based). */
  order: number;
  /** Emoji shown on the unit card. */
  icon: string;
  /** Ids of the lessons in this unit, in the order they should be taken. */
  lessonIds: string[];
};

/**
 * The kinds of activities a lesson can contain. `chat`, `audio`, and `video`
 * are scaffolding for future AI/Stream Vision Agent lessons — the data is here
 * now so screens can be built against a stable shape.
 */
export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "chat"
  | "audio"
  | "video";

/** A single word/term to learn, with its translation. */
export type VocabularyItem = {
  id: string;
  /** The word in the language being learned, e.g. "hola". */
  term: string;
  /** English translation, e.g. "hello". */
  translation: string;
  /** Simple phonetic hint for pronunciation, e.g. "OH-lah". */
  pronunciation?: string;
  /** Optional example sentence using the term. */
  example?: string;
};

/** A useful phrase or sentence to learn. */
export type Phrase = {
  id: string;
  /** The phrase in the language being learned. */
  text: string;
  /** English translation of the phrase. */
  translation: string;
  pronunciation?: string;
  /** When the phrase is typically used, e.g. "greeting a friend". */
  context?: string;
};

/**
 * Prompt configuration for AI-driven lessons (chat + future audio/video Vision
 * Agent teachers). Kept simple and serializable so it can be sent to a backend
 * that talks to the model — never call the model directly from the app.
 */
export type AiTeacherPrompt = {
  /** System prompt that sets the AI teacher's persona and rules. */
  system: string;
  /** First line the teacher says to open the lesson. */
  greeting: string;
  /** Concrete things the teacher should get the learner to practice. */
  objectives: string[];
};

/**
 * One step inside a lesson. Only the fields relevant to the activity's `type`
 * are expected to be filled in — this keeps the union simple and teachable
 * instead of splitting into many separate types.
 */
export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  /** Short instruction shown to the learner, e.g. "Match the words". */
  instruction: string;
  /** Present on `vocabulary` activities. */
  vocabulary?: VocabularyItem[];
  /** Present on `phrase` activities. */
  phrases?: Phrase[];
  /** Present on `chat`, `audio`, and `video` (AI teacher) activities. */
  aiTeacher?: AiTeacherPrompt;
};

/** A single learning outcome for a lesson, shown on the lesson intro. */
export type LessonGoal = {
  id: string;
  label: string;
};

/** A lesson: the smallest completable unit of learning. */
export type Lesson = {
  id: string;
  /** Which language this lesson belongs to. */
  languageCode: LanguageCode;
  /** Which unit this lesson belongs to. */
  unitId: string;
  title: string;
  description: string;
  /** Sort order within its unit (1-based). */
  order: number;
  /** XP awarded for completing the lesson. */
  xp: number;
  /** What the learner will be able to do after the lesson. */
  goals: LessonGoal[];
  /** Ordered steps that make up the lesson. */
  activities: Activity[];
};

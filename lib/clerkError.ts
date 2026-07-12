/**
 * Pulls a human-friendly message out of a Clerk error.
 *
 * Clerk's method-based flows (e.g. `signIn.password()`) resolve to
 * `{ error }`, where `error` is a `ClerkAPIResponseError` carrying an
 * `errors` array. We prefer the detailed `longMessage`, fall back to the
 * short `message`, and finally to a caller-provided fallback.
 */
export function clerkErrorMessage(error: unknown, fallback: string): string {
  const e = error as {
    errors?: { message?: string; longMessage?: string }[];
    message?: string;
  };

  return (
    e?.errors?.[0]?.longMessage ??
    e?.errors?.[0]?.message ??
    e?.message ??
    fallback
  );
}

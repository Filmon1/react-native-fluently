import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type Props = {
  visible: boolean;
  /** Email the code was "sent" to — shown in the description. */
  email?: string;
  onClose: () => void;
  /** Fired once the final digit is entered and only closes on success. */
  onComplete: (code: string) => Promise<boolean> | boolean;
  /** Message shown inside the sheet when verification is rejected. */
  error?: string;
};

const DEFAULT_ERROR = "That code didn't work. Please try again.";

/**
 * Bottom-sheet modal for entering a 6-digit email verification code.
 * Stays above the keyboard and only completes after the verifier accepts the code.
 */
export function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
  error,
}: Props) {
  const [code, setCode] = useState("");
  const [showError, setShowError] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Reset the code and clear any error each time the sheet opens.
  useEffect(() => {
    if (visible) {
      setCode("");
      setShowError(false);
    }
  }, [visible]);

  // A rejected code: clear the boxes, show the error, and keep the keypad up
  // so the retry path is obvious.
  const handleFailure = () => {
    setCode("");
    setShowError(true);
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    // Editing dismisses a stale error so the boxes read as a fresh attempt.
    setShowError(false);

    if (digits.length !== CODE_LENGTH) {
      return;
    }

    void (async () => {
      try {
        const verified = await onComplete(digits);
        if (verified) {
          setCode("");
          onClose();
        } else {
          handleFailure();
        }
      } catch {
        handleFailure();
      }
    })();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      onShow={() => inputRef.current?.focus()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        {/* Backdrop — tap to dismiss */}
        <Pressable
          onPress={onClose}
          style={{ flex: 1, backgroundColor: "rgba(13, 19, 43, 0.45)" }}
        />

        {/* Sheet */}
        <View
          className="bg-background px-6 pt-6 pb-10"
          style={{ borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
        >
          <Text className="text-h2 text-ink">Check your email</Text>
          <Text className="text-body-md text-muted mt-2">
            We sent a 6-digit verification code to{" "}
            <Text className="text-body-md text-ink">
              {email || "your email"}
            </Text>
            . Enter it below to continue.
          </Text>

          {/* Digit boxes — tapping focuses the hidden input */}
          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="flex-row justify-between mt-6"
          >
            {Array.from({ length: CODE_LENGTH }).map((_, i) => {
              const active = code.length === i;
              const borderClass = showError
                ? "border-error"
                : active || code[i]
                  ? "border-lingua-purple"
                  : "border-border";
              return (
                <View
                  key={i}
                  className={`w-12 h-14 rounded-2xl border-2 items-center justify-center ${borderClass}`}
                >
                  <Text className="text-h2 text-ink">{code[i] ?? ""}</Text>
                </View>
              );
            })}
          </Pressable>

          {/* Verification error — surfaced inside the sheet, above the keypad */}
          {showError ? (
            <Text className="text-body-sm text-error mt-3">
              {error || DEFAULT_ERROR}
            </Text>
          ) : null}

          {/* Hidden field driving the boxes */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleChange}
            keyboardType="number-pad"
            accessibilityLabel="Verification code"
            accessibilityHint="Enter the six-digit verification code received by email"
            accessibilityValue={{
              text: code.length
                ? `${code.length} of ${CODE_LENGTH} digits entered`
                : `0 of ${CODE_LENGTH} digits entered`,
            }}
            style={{ position: "absolute", opacity: 0, height: 1, width: 1 }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Renders a masked input with a show/hide eye toggle (for passwords). */
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

/**
 * Bordered input card with a floating label — used across the auth screens.
 * When `secure` is set it masks the value and shows an eye toggle on the right.
 */
export function AuthTextField({
  label,
  value,
  onChangeText,
  placeholder,
  secure = false,
  keyboardType,
}: Props) {
  const [hidden, setHidden] = useState(secure);

  return (
    <View className="rounded-2xl border border-border px-4 py-3">
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="text-body-sm text-muted mb-1">{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={hidden}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel={label}
            className="text-body-lg text-ink"
            style={{ paddingVertical: 0 }}
          />
        </View>

        {secure && (
          <TouchableOpacity
            onPress={() => setHidden((prev) => !prev)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            accessibilityHint={
              hidden ? "Show the entered password" : "Hide the entered password"
            }
            className="pl-3"
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import type { Language, LanguageCode } from "@/types/learning";

/**
 * Language selection screen.
 *
 * Renders the hardcoded languages from `data/languages.ts` as selectable
 * cards. The picked language is kept in local state and confirmed with the
 * bottom button (which replaces the design's "See all languages" pill).
 */
export default function LanguageSelection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<LanguageCode>(languages[0].code);

  // Filter the list as the user types in the search field.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((language) =>
      language.name.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center px-6 pt-2 pb-4">
          <TouchableOpacity
            className="w-9 h-9 items-center justify-center -ml-2"
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={26} color="#0D132B" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-h3 text-ink -ml-9">
            Choose a language
          </Text>
        </View>

        {/* Search */}
        <View className="px-6">
          <View className="flex-row items-center rounded-full bg-surface px-5 h-14">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-body-lg text-ink"
              placeholder="Search languages"
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Language list */}
        <ScrollView
          className="px-6"
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 16, gap: 12 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="font-poppins-semibold text-[18px] text-ink mb-1">
            Popular
          </Text>

          {results.map((language) => (
            <LanguageRow
              key={language.code}
              language={language}
              selected={language.code === selected}
              onPress={() => setSelected(language.code)}
            />
          ))}
        </ScrollView>

        {/* Confirm (replaces "See all languages") */}
        <View className="px-6 pt-2">
          <TouchableOpacity
            className="btn--primary flex-row items-center justify-center"
            activeOpacity={0.9}
            onPress={() =>
              // Forward the chosen language to the home route, then return to
              // it (navigating to "/" pops back to the existing screen).
              router.navigate({ pathname: "/", params: { language: selected } })
            }
          >
            <Text className="btn__label">Confirm</Text>
          </TouchableOpacity>
        </View>

        {/* Decorative earth footer */}
        <Image
          source={images.earth}
          resizeMode="cover"
          className="w-full h-40 mt-2 -mb-6"
        />
      </View>
    </SafeAreaView>
  );
}

/** A single selectable language card. */
function LanguageRow({
  language,
  selected,
  onPress,
}: {
  language: Language;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardShadow}
      className={`flex-row items-center rounded-2xl border p-4 ${
        selected
          ? "border-lingua-purple bg-[#F5F3FF]"
          : "border-border bg-white"
      }`}
    >
      {/* Flag */}
      <View className="w-12 h-12 rounded-full overflow-hidden bg-surface">
        <Image
          source={{ uri: language.flag }}
          resizeMode="cover"
          className="w-full h-full"
        />
      </View>

      {/* Name + learners */}
      <View className="flex-1 ml-4">
        <Text className="text-h3 text-ink">{language.name}</Text>
        <Text className="text-body-md text-muted">
          {language.learners} learners
        </Text>
      </View>

      {/* Trailing indicator */}
      {selected ? (
        <View className="w-7 h-7 rounded-full bg-lingua-purple items-center justify-center">
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={22} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Soft card shadow — platform shadow props aren't expressible in NativeWind.
  cardShadow: {
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
});

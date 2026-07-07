import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="screen"
        contentContainerStyle={{ padding: 24, gap: 24 }}
      >
        {/* Typography scale */}
        <View className="gap-2">
          <Text className="text-caption text-muted">DESIGN SYSTEM</Text>
          <Text className="text-h1 text-ink">Lingua</Text>
          <Text className="text-body-md text-muted">
            Poppins type scale + brand palette, wired through NativeWind.
          </Text>
        </View>

        <View className="card gap-2">
          <Text className="text-h3 text-ink">Card / Module Title</Text>
          <Text className="text-body-md text-muted">
            Reusable surface with soft shadow, border and rounded corners.
          </Text>
        </View>

        {/* Brand colors */}
        <View className="gap-3">
          <Text className="text-h4 text-ink">Colors</Text>
          <View className="flex-row flex-wrap gap-3">
            <View className="w-16 h-16 rounded-2xl bg-lingua-purple" />
            <View className="w-16 h-16 rounded-2xl bg-lingua-deep-purple" />
            <View className="w-16 h-16 rounded-2xl bg-lingua-blue" />
            <View className="w-16 h-16 rounded-2xl bg-lingua-green" />
            <View className="w-16 h-16 rounded-2xl bg-warning" />
            <View className="w-16 h-16 rounded-2xl bg-streak" />
            <View className="w-16 h-16 rounded-2xl bg-error" />
          </View>
        </View>

        {/* Primary button */}
        <View className="btn--primary">
          <Text className="btn__label">Start learning</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
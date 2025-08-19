import { router } from "expo-router";
import { ChevronLeft } from "lib/icons/ChevronLeft";
import { View, Pressable } from "react-native";
import { Text } from "components/ui/text";

export default function ChevronHeader({ title }: { title: string }) {
  return (
    <View className="p-4 flex-row items-center">
      <Pressable className="pr-2" onPress={() => router.dismiss()}>
        <ChevronLeft className="w-8 h-8 color-white" size={30} />
      </Pressable>
      <Text className="text-3xl font-bold">{title}</Text>
    </View>
  );
}

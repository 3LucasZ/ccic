import { Pressable } from "react-native";
import { Plus } from "~/lib/icons/Plus";

export default function FAB({
  disabled,
  onPress,
}: {
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center
          rounded-full bg-teal-400 disabled:invisible"
    >
      <Plus />
    </Pressable>
  );
}

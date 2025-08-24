import { Pressable } from "react-native";
import { Plus } from "~/lib/icons/Plus";
import { cn } from "~/lib/utils";

export default function FAB({
  className = "",
  disabled = false,
  onPress,
  children,
}: {
  disabled?: boolean;
  className?: string;
  onPress: () => void;
  children: React.JSX.Element;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-teal-400 disabled:invisible",
        className
      )}
    >
      {children}
    </Pressable>
  );
}

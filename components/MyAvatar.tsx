import { nameToImg, nameToInitials } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Text } from "./ui/text";
import { UserRound } from "lucide-react-native";
import { View } from "react-native";
export default function MyAvatar({
  uri,
  name,
  size,
}: {
  uri: string | undefined;
  name: string | undefined;
  size: number;
}) {
  const fallback = name ? (
    <Text style={{ fontSize: size / 3, lineHeight: size / 2 }}>
      {nameToInitials(name)}
    </Text>
  ) : (
    <UserRound size={size} />
  );

  return (
    <Avatar alt="avatar" style={{ height: size, width: size }}>
      <AvatarImage source={{ uri: uri }} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

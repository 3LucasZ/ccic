import * as React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";

export default function ProfileScreen() {
  const avatar_uri = "https://avatars.githubusercontent.com/u/72239682?v=4";
  const name = "Lucas Zheng";
  const avatar_fallback = "LZ";
  return (
    <View>
      <View className="flex-row ">
        <Avatar alt="" className="w-24 h-24 justify-self-center">
          <AvatarImage source={{ uri: avatar_uri }} />
          <AvatarFallback>
            <Text>{avatar_fallback}</Text>
          </AvatarFallback>
        </Avatar>
        <Text className="text-2xl font-semibold">{name}</Text>
      </View>
      <Text>Requests</Text>
      <View>
        <FriendRequest
          avatar_uri={avatar_uri}
          avatar_fallback={avatar_fallback}
          name={name}
        />
        <FriendRequest
          avatar_uri={avatar_uri}
          avatar_fallback={avatar_fallback}
          name={name}
        />
      </View>
      <Text>Pending</Text>
      <View>
        <FriendPending
          avatar_uri={avatar_uri}
          avatar_fallback={avatar_fallback}
          name={name}
        />
        <FriendPending
          avatar_uri={avatar_uri}
          avatar_fallback={avatar_fallback}
          name={name}
        />
      </View>
    </View>
  );
}
function FriendRequest({
  avatar_uri,
  avatar_fallback,
  name,
}: {
  avatar_uri: string;
  avatar_fallback: string;
  name: string;
}) {
  return (
    <View className="flex-row">
      <Avatar alt="" className="justify-self-center">
        <AvatarImage source={{ uri: avatar_uri }} />
        <AvatarFallback>
          <Text>{avatar_fallback}</Text>
        </AvatarFallback>
      </Avatar>
      <Text>{name}</Text>

      <Check
        className="text-emerald-400"
        onPress={() => {
          console.log("HI");
        }}
      />
      <X
        className="text-rose-400"
        onPress={() => {
          console.log("HI");
        }}
      />
    </View>
  );
}

function FriendPending({
  avatar_uri,
  avatar_fallback,
  name,
}: {
  avatar_uri: string;
  avatar_fallback: string;
  name: string;
}) {
  return (
    <View className="flex-row">
      <Avatar alt="" className="justify-self-center">
        <AvatarImage source={{ uri: avatar_uri }} />
        <AvatarFallback>
          <Text>{avatar_fallback}</Text>
        </AvatarFallback>
      </Avatar>
      <Text>{name}</Text>
    </View>
  );
}

import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link } from "expo-router";

export default function Screen() {
  const avatar_uri = "https://avatars.githubusercontent.com/u/72239682?v=4";
  const name = "Lucas Zheng";
  const avatar_fallback = "LZ";
  const [value, setValue] = React.useState("account");
  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center">
          <Avatar alt="" className="w-24 h-24">
            <AvatarImage source={{ uri: avatar_uri }} />
            <AvatarFallback>
              <Text>{avatar_fallback}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="w-8"></View>
          <Text className="text-2xl font-semibold">{name}</Text>
        </View>
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="account" className="flex-1">
              <Text>English</Text>
            </TabsTrigger>
            <TabsTrigger value="password" className="flex-1">
              <Text>中文</Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Link href="/about" asChild>
          <Button>
            <Text>About Us</Text>
          </Button>
        </Link>
        <View className="gap-y-2">
          <Text className="font-bold text-xl">Requests</Text>
          <View className="gap-y-4">
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
        </View>
        <View className="gap-y-2">
          <Text className="font-bold text-xl">Pending</Text>
          <View className="gap-y-4">
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
        </View>
        <View className="gap-y-2">
          <Text className="font-bold text-xl">Buddies</Text>
          <View className="gap-y-4">
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
            <FriendRequest
              avatar_uri={avatar_uri}
              avatar_fallback={avatar_fallback}
              name={name}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    <View className="flex-row items-center">
      <Avatar alt="" className="justify-self-center w-12 h-12">
        <AvatarImage source={{ uri: avatar_uri }} />
        <AvatarFallback>
          <Text>{avatar_fallback}</Text>
        </AvatarFallback>
      </Avatar>
      <Text className="text-base font-semibold flex-1 ml-4">{name}</Text>

      <Button
        variant="outline"
        size="icon"
        onPress={() => console.log("Accepted")}
      >
        <Check className="text-emerald-400 h-6 w-6" />
      </Button>
      <View className="w-2"></View>
      <Button
        variant="outline"
        size="icon"
        onPress={() => console.log("Declined")}
      >
        <X className="text-rose-400 h-6 w-6" />
      </Button>
    </View>
  );
}

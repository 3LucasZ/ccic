import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link } from "expo-router";
import { useSession } from "~/lib/ctx";

export default function Screen() {
  const { user } = useSession();
  console.log(user);
  const name = "Lucas Zheng";
  const avatar_uri = "https://avatars.githubusercontent.com/u/72239682?v=4";
  const avatar_fallback = "LZ";
  const [value, setValue] = React.useState("en");
  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center">
          <Avatar alt="" className="w-24 h-24">
            <AvatarImage source={{ uri: user?.user_metadata.picture }} />
            <AvatarFallback>
              <Text>{avatar_fallback}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="w-8"></View>
          <View>
            <Text className="text-2xl font-semibold">
              {user?.user_metadata.name}
            </Text>
            <Text className="text-gray-400">{user?.email}</Text>
          </View>
        </View>
        <Button>
          <Text>Sign out</Text>
        </Button>
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="en" className="flex-1">
              <Text>English</Text>
            </TabsTrigger>
            <TabsTrigger value="zh" className="flex-1">
              <Text>中文</Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Link href="/buddies" asChild>
          <Button>
            <Text>Buddies</Text>
          </Button>
        </Link>
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

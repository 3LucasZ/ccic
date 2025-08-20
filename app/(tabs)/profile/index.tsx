import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link, router } from "expo-router";
import { useSession } from "~/lib/ctx";
import { fallbackFromName } from "~/lib/utils";

export default function Screen() {
  const { session, signIn, signOut } = useSession();
  const user = session?.user;
  console.log(user);

  const [value, setValue] = React.useState("en");
  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="flex-1 gap-y-6">
        <View className="flex-row items-center">
          <Avatar alt="" className="w-24 h-24">
            <AvatarImage source={{ uri: user?.user_metadata.picture }} />
            <AvatarFallback>
              <Text>{fallbackFromName(user?.user_metadata.name)}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="w-8"></View>
          <View>
            <Text className="text-2xl font-semibold">
              {user?.user_metadata.name || "Guest"}
            </Text>
            <Text className="text-gray-400">
              {user?.email || "guest@gmail.com"}
            </Text>
          </View>
        </View>
        {!user && (
          <Button
            onPress={async () => {
              router.push("/sign-in");
            }}
          >
            <Text>Sign in</Text>
          </Button>
        )}
        {user && (
          <Button
            onPress={async () => {
              await signOut();
              router.push("/sign-in");
            }}
          >
            <Text>Sign out</Text>
          </Button>
        )}
        {/* <Button className="bg-teal-400" disabled>
          <Text>Verified</Text>
        </Button> */}
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

        <Button onPress={() => router.push("/profile/buddies")}>
          <Text>Buddies</Text>
        </Button>
        <Button onPress={() => router.push("/profile/about")}>
          <Text>About Us</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

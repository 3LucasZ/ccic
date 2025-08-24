import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import ChevronHeader from "~/components/ChevronHeader";
import MyAvatar from "~/components/MyAvatar";
import { supabase } from "~/lib/supabase";
import { Tables } from "~/lib/types";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/ctx";

function Screen() {
  // data
  const local = useLocalSearchParams();
  const req_id = local.req_id;
  if (typeof req_id !== "string") return;
  const { user: user1 } = useSession();
  const [user2, setUser2] = useState<Tables<"users">>();
  const [validId, setValidId] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", req_id)
        .single();
      if (error || !data) {
        setValidId(false);
      } else {
        setUser2(data);
      }
    };
    fetch();
  }, []);
  if (!validId) {
    return (
      <SafeAreaView className="flex-1">
        <Text>Error: qr code scanned was invalid</Text>
      </SafeAreaView>
    );
  }
  if (!user1 || !user2) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <ChevronHeader title="Buddy Request" />
      <View className="flex-1 items-center justify-center">
        <MyAvatar uri={user2.uri} name={user2.name} size={200} />
        <View className="h-20"></View>
        <Text className="text-4xl">{user2.name}</Text>
        <View className="h-10"></View>
        <Button
          size={"lg"}
          onPress={async () => {
            await supabase
              .from("friend_reqs")
              .insert({ from_id: user1.id, to_id: user2.id });
          }}
        >
          <Text className="text-3xl">Send Request</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
export default Screen;

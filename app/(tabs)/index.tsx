import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Link, router } from "expo-router";
import { Textarea } from "~/components/ui/textarea";
import { fakeUsers } from "./profile/buddies";
import { fallbackFromName } from "~/lib/utils";
import FAB from "~/components/ui/FAB";
import BottomSheetPost from "~/components/BottomSheetPost";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { useSession } from "~/lib/ctx";
import { Separator } from "~/components/ui/separator";
import { supabase } from "~/lib/supabase";
import { QueryData } from "@supabase/supabase-js";

export default function Screen() {
  const { session } = useSession();
  const [value, setValue] = React.useState("");
  const sheetRef = useRef<BottomSheet>(null);
  const closeSheet = () => sheetRef.current?.close();
  const openSheet = () => sheetRef.current?.expand();

  // posts
  const [loading, setLoading] = useState(true);
  const postsQuery = supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  type Posts = QueryData<typeof postsQuery>;
  const [posts, setPosts] = useState<Posts>([]);
  useEffect(() => {
    async function getData() {
      // Reset state and start loading
      setLoading(true);
      setPosts([]);
      const { data, error } = await postsQuery;
      // console.log(data);
      if (data) {
        setPosts(data);
      }
      if (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    }

    getData();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView className="flex-col h-full">
        <Button onPress={() => router.push("/experiment")}>
          <Text>Experiment</Text>
        </Button>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4 p-2">
            {fakeUsers.map((user) => (
              <Buddy uri={user.avatar_uri} name={user.name} key={user.id} />
            ))}
          </View>
        </ScrollView>
        {/* <Textarea
        // ref={inputRef}
        placeholder="Write some stuff..."
        value={value}
        onChangeText={setValue}
        aria-labelledby="textareaLabel"
      />
      <Button>
        <Text>Post</Text>
      </Button> */}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>How is God calling you to love one another today?</Text>
          </CardContent>
        </Card>
        <View className="h-4"></View>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bulletin Board</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>{"\u2022 7/16-20: Vacation Bible School (VBS)"}</Text>
            <Text>{"\u2022 8/13: Hope Horizon Flooring Project"}</Text>
            <Text>{"\u2022 8/2: Country Lane Beautification"}</Text>
            <Text>{"\u2022 9/2: English congregation new time"}</Text>
          </CardContent>
        </Card>

        {/* <Separator className="my-4" /> */}
        <Text className="p-4 text-2xl font-bold">Posts</Text>
        <View className="flex-col gap-4">
          {posts.map((post) => (
            <PostBlock title={post.title} text={post.text} key={post.id} />
          ))}
        </View>
      </ScrollView>
      <FAB disabled={session == null} onPress={openSheet} />
      <BottomSheetPost ref={sheetRef} />
    </SafeAreaView>
  );
}

function Buddy({ uri, name }: { uri: string; name: string }) {
  return (
    <View className="flex-col">
      <Avatar alt={""} className="w-20 h-20">
        <AvatarImage source={{ uri: uri }} />
        <AvatarFallback>
          <Text className="text-xl">{fallbackFromName(name)}</Text>
        </AvatarFallback>
      </Avatar>
      <View className="h-2"></View>
      <Text className="text-xs w-20" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}
function PostBlock({ title, text }: { title: string; text: string }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text>{text}</Text>
      </CardContent>
    </Card>
  );
}

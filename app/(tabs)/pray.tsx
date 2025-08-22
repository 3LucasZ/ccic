import { HeartHandshake } from "~/lib/icons/Hands";
import { Heart } from "~/lib/icons/Heart";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { Plus } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetPray from "~/components/BottomSheetPray";
import { Tables } from "~/lib/types";
import { supabase } from "~/lib/supabase";
import { useSession } from "~/lib/ctx";
import { QueryData } from "@supabase/supabase-js";
import { Input } from "~/components/ui/input";
import FAB from "~/components/ui/FAB";
import MyAvatar from "~/components/MyAvatar";

export default function Screen() {
  const { session } = useSession();
  const [selectedTab, setSelectedTab] = React.useState("all");
  const [loading, setLoading] = useState(true);
  const prayerReqsQuery = supabase
    .from("prayer_reqs")
    .select("*, author:users(*)")
    .order("created_at", { ascending: false });
  type PrayerReqs = QueryData<typeof prayerReqsQuery>;
  const [prayers, setPrayers] = useState<PrayerReqs>([]);
  const [value, setValue] = React.useState("");
  const onChangeText = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    async function getData() {
      // Reset state and start loading
      setLoading(true);
      setPrayers([]);
      const { data, error } = await prayerReqsQuery;
      // console.log(data);
      if (data) {
        setPrayers(data);
      }
      if (error) {
        console.error("Error fetching prayers:", error);
      }
      setLoading(false);
    }

    getData();
  }, []);
  // bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async () => {
    const { data, error } = await prayerReqsQuery;
    if (data) {
      setPrayers(data);
    }
  }, []);
  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1">
        <Input
          placeholder="Search"
          value={value}
          onChangeText={onChangeText}
          className=" mb-4"
        />
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full flex-col gap-2"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="all" className="flex-1">
              <Text>All</Text>
            </TabsTrigger>
            <TabsTrigger value="buddies" className="flex-1">
              <Text>Buddies</Text>
            </TabsTrigger>
            <TabsTrigger value="me" className="flex-1">
              <Text>Me</Text>
            </TabsTrigger>
            <TabsTrigger value="praying" className="flex-1">
              <Text>Praying</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View className="gap-2">
                {prayers ? (
                  prayers.map((prayer, idx) => (
                    <Prayer
                      name={prayer.author.name}
                      avatar_uri={prayer.author.uri}
                      text={prayer.text}
                      date={new Date(prayer.created_at)}
                      key={idx}
                    />
                  ))
                ) : (
                  <Text>No prayers to display</Text>
                )}
                <View className="h-36"></View>
              </View>
            </ScrollView>
          </TabsContent>
          <TabsContent value="buddies">
            <Text>b</Text>
          </TabsContent>
          <TabsContent value="me">
            <Text>c</Text>
          </TabsContent>
          <TabsContent value="praying">
            <Text>d</Text>
          </TabsContent>
        </Tabs>
      </SafeAreaView>
      <FAB disabled={session == null} onPress={handleOpenPress} />
      <BottomSheetPray ref={bottomSheetRef} />
    </GestureHandlerRootView>
  );
}
function Prayer({
  name,
  avatar_uri,
  text,
  date,
}: {
  name: string;
  avatar_uri: string;
  text: string;
  date: Date;
}) {
  const [starred, setStarred] = useState(false);
  const toggleStarred = () => {
    setStarred(!starred);
  };
  const starStyle = starred ? "text-rose-400 fill-rose-400" : "text-white";
  return (
    <Card>
      {/* Use CardHeader for titles and avatars. Use flex-row for layout. */}
      <CardHeader className="flex-row items-center p-4">
        <MyAvatar name={name} uri={avatar_uri} size={50} />
        {/* This View takes up the middle space, pushing the icon to the right */}
        <View className="flex-1 ml-4">
          <CardTitle>{name}</CardTitle>
          {/* Use CardDescription for secondary info. Format the date nicely. */}
          <CardDescription>
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </View>

        {/* Wrap interactive icons in a Button for better UX */}
        <Pressable className="w-12 h-12" onPress={toggleStarred}>
          <Heart className={starStyle} size={32} />
        </Pressable>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <Text className="text-base">{text}</Text>
      </CardContent>
      {/* CardFooter is often used for actions, moved the date to the header */}
    </Card>
  );
}

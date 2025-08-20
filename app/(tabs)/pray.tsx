import { HeartHandshake } from "~/lib/icons/Hands";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
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

export default function Screen() {
  const { session } = useSession();
  const [value, setValue] = React.useState("all");
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState<Tables<"prayer_reqs">[]>([]);

  useEffect(() => {
    async function getData() {
      // Reset state and start loading
      setLoading(true);
      setPrayers([]);
      const { data, error } = await supabase
        .from("prayer_reqs")
        .select("*, users(*)");
      console.log(data);
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
        <Tabs
          value={value}
          onValueChange={setValue}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-2">
                {prayers.map((prayer) => (
                  <Prayer
                    name={"prayer.text"}
                    avatar_uri="LZ"
                    text={prayer.text}
                    date={new Date()}
                  />
                ))}
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
      <Pressable
        disabled={session == null}
        onPress={handleOpenPress}
        className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center
          rounded-full bg-teal-400 disabled:invisible"
      >
        <Plus />
      </Pressable>
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
  return (
    <Card>
      {/* Use CardHeader for titles and avatars. Use flex-row for layout. */}
      <CardHeader className="flex-row items-center p-4">
        <Avatar alt={`${name}'s avatar`} className="w-12 h-12">
          <AvatarImage source={{ uri: avatar_uri }} />
          <AvatarFallback>
            <Text>{"LZ"}</Text>
          </AvatarFallback>
        </Avatar>

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
        <Button variant="secondary" size="icon" className="w-12 h-12">
          <HeartHandshake className="text-rose-400" size={28} />
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <Text className="text-base">{text}</Text>
      </CardContent>
      {/* CardFooter is often used for actions, moved the date to the header */}
    </Card>
  );
}

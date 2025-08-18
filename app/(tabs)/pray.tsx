import { HeartHandshake } from "~/lib/icons/Hands";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { Check, Plus } from "lucide-react-native";

export default function Screen() {
  const [value, setValue] = React.useState("all");
  return (
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
              {Array.from({ length: 10 }).map((_, index) => (
                <Prayer
                  name={"LZ"}
                  avatar_uri={""}
                  text={"My prayer request"}
                  date={new Date()}
                  key={index}
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
      <Pressable
        onPress={() => {
          console.log("HI");
        }}
        className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center
          rounded-full bg-teal-600 shadow-lg"
      >
        <Plus />
      </Pressable>
    </SafeAreaView>
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

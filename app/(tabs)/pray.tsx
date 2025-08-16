import { HeartHandshake } from "~/lib/icons/Hands";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
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

export default function PrayScreen() {
  const [value, setValue] = React.useState("all");
  return (
    <View className="flex-1">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
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
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
              <Prayer
                name={"LZ"}
                avatar_uri={"LZ"}
                text={"My prayer request"}
                date={new Date()}
              />
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
    </View>
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
      <CardTitle>
        <Avatar alt="" className="w-16 h-16">
          <AvatarImage source={{ uri: avatar_uri }} />
          <AvatarFallback>
            <Text>{"LZ"}</Text>
          </AvatarFallback>
        </Avatar>
        <Text>{name}</Text>
        <HeartHandshake className="text-rose-400" />
      </CardTitle>
      <CardContent>
        <Text>{text}</Text>
      </CardContent>
      <CardFooter>
        <Text>{date.toString()}</Text>
      </CardFooter>
    </Card>
  );
}

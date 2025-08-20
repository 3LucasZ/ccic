import * as React from "react";
import { ScrollView, View } from "react-native";
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

export default function Screen() {
  const [value, setValue] = React.useState("");
  return (
    <View className="flex-col">
      {/* <Button onPress={() => router.push("/experiment")}>
        <Text>Experiment</Text>
      </Button> */}
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
    </View>
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

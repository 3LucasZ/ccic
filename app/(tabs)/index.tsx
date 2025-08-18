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

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const size = 60;

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className="flex-col">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4 p-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Buddy uri={""} name={"Lucas Zheng"} key={index} />
          ))}
        </View>
      </ScrollView>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>How is God calling you to love one another today?</Text>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bulletin Board</CardTitle>
        </CardHeader>
        <CardContent>
          <Text>{"\u2022 Beautiful Day"}</Text>
          <Text>{"\u2022 Beautiful Day"}</Text>
        </CardContent>
      </Card>
    </View>
  );
}

function Buddy({ uri, name }: { uri: string; name: string }) {
  return (
    <View className="flex-col">
      <Avatar alt={""} className="bg-white w-24 h-24">
        <AvatarFallback>
          <Text>LZ</Text>
        </AvatarFallback>
      </Avatar>
      <View className="h-2"></View>
      <Text className="text-xs w-24" numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
}

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
import { Link } from "expo-router";
import { Textarea } from "~/components/ui/textarea";

export default function Screen() {
  const [value, setValue] = React.useState("");
  return (
    <View className="flex-col">
      <Link href={"/sign-in"} asChild>
        <Button>
          <Text>Sign in</Text>
        </Button>
      </Link>
      <Link href={"/experiment"} asChild>
        <Button>
          <Text>Experiment</Text>
        </Button>
      </Link>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-4 p-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <Buddy uri={""} name={"Lucas Zheng"} key={index} />
          ))}
        </View>
      </ScrollView> */}
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

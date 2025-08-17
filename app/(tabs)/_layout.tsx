import { Tabs } from "expo-router";
import { House } from "lib/icons/House";
import { BookOpen, MessageSquare, UserRound } from "lucide-react-native";
import { View } from "react-native";
import { Image } from "~/components/ui/image";
import { Text } from "~/components/ui/text";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle: (props) => <Logo />,
        headerStyle: {
          // remove ugly white outline
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => <House color={color} />,
        }}
      />
      <Tabs.Screen
        name="pray"
        options={{
          title: "Pray",
          tabBarIcon: ({ color, focused }) => <MessageSquare color={color} />,
        }}
      />
      <Tabs.Screen
        name="sermon"
        options={{
          title: "Sermon",
          tabBarIcon: ({ color, focused }) => <BookOpen color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => <UserRound color={color} />,
        }}
      />
    </Tabs>
  );
}

function Logo() {
  return (
    <View className="flex-row">
      <Image
        className="w-8 h-8"
        source={require("../../assets/images/logo.png")}
        // force rectangular icon to fit well
        resizeMode="contain"
      />
      <View className="w-4"></View>
      <Text>CCIC</Text>
    </View>
  );
}

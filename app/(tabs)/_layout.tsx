import { Tabs } from "expo-router";
import { House } from "lib/icons/House";
import { BookOpen, MessageSquare, UserRound } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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

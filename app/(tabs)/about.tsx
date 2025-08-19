import { Download } from "lucide-react-native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 p-4">
      <View className="p-4">
        <Text className="text-3xl font-bold">About Us</Text>
      </View>
      <ScrollView>
        <View className="p-4">
          <Text className="text-xl font-bold">Mission</Text>
          <Text>
            The mission of the CCIC app is to connect the entire CCIC church
            family together: Chinese, English, and Cantonese speaking members
            from our various campuses in North California, in and through
            Christ. Given the ambitious mission of welcoming 100 new members to
            Abide in 2026, we believe this app will facilitate the transition.
          </Text>
          <Text>We also hope to make it easier to: </Text>
          <Text>
            notify members of events, engage with God's word daily, and pray for
            one another.
          </Text>
          <Text>
            Unfortunately, apps and social media are designed to be addictive
            and harmful to our population, especially our children. We hope to
            combat the darkness by replacing traditional social media and using
            technology in a healthy, kingdom-building way.
          </Text>
          <Text>
            Please contact us at REDACTED if you have any suggestions or
            complaints. Thank you!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

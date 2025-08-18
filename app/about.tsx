import { Download } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View>
      <Text>About</Text>
      <Text>
        The main mission of the CCIC app is to connect the entire CCIC church
        family together: Chinese, English, and Cantonese speaking members from
        our various campuses in North California in Christ. Given the ambitious
        mission of welcoming 100 new members to Abide, this app will facilitate
        the transition.
      </Text>
      <Text>We also hope to make it easier to: </Text>
      <Text>
        notify members of events, engage with God's word daily, and pray for one
        another.
      </Text>
      <Text>
        Unfortunately, apps and social media are designed to be addictive and
        harmful to our population, especially our children. We hope to combat
        the darkness by replacing traditional social media and using technology
        in a healthy, kingdom-building way.
      </Text>
      <Text>
        Please contact us at REDACTED if you have any suggestions or complaints.
        Thank you!
      </Text>
    </View>
  );
}

import { Download } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View>
      <View className="flex-row">
        <Button>
          <Text>Watch</Text>
        </Button>
        <Button>
          <Download />
        </Button>
      </View>
      <Text>Matthew 5:12</Text>
      <Text>Notes</Text>
      <Text>Challenge</Text>
      <Text>How is God calling you to love one another?</Text>
    </View>
  );
}

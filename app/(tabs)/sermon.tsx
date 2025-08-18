import { Download } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { supabase } from "~/lib/supabase";

export default function Screen() {
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState([]);
  async function getData() {
    const { data, error, status } = await supabase.from("sermons").select();
    if (data) {
      setSermons(data);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <View className="flex-row">
        <Button>
          <ChevronLeft />
        </Button>
        <Text>Sermon 8/18/25</Text>
        <Button>
          <ChevronRight />
        </Button>
      </View>
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

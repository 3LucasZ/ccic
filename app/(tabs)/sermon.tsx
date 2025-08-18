import { Download } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { supabase } from "~/lib/supabase";
import { Tables } from "~/lib/types";

export default function Screen() {
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState<Tables<"sermons">[]>([]);
  const [index, setIndex] = useState(0);
  async function getData() {
    const { data, error, status } = await supabase.from("sermons").select();
    if (data) {
      setSermons(data);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const sermon = sermons[index];
  return (
    <View>
      <View className="flex-row">
        <Button>
          <ChevronLeft />
        </Button>
        <View>
          <Text>{sermon.title}</Text>
          <Text>{sermon.date}</Text>
        </View>
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
      <Text>{sermon.passage}</Text>
      <Text>Summary</Text>
      <Text>{sermon.summary}</Text>
      <Text>Application</Text>
      <Text>{sermon.application}</Text>
    </View>
  );
}

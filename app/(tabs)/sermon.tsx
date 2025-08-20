import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { generateBibleQuery, getBibleText } from "~/lib/bible";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { Download } from "~/lib/icons/Download";
import { supabase } from "~/lib/supabase";
import { Tables } from "~/lib/types";

export default function Screen() {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState<Tables<"sermons">[]>([]);
  const [passageText, setPassageText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      // Reset state and start loading
      setLoading(true);
      setSermons([]);

      const { data, error } = await supabase.from("sermons").select();

      if (data) {
        setSermons(data);
        if (data.length > 0) {
          const sermon = data[0];
          if (sermon.passage) {
            setPassageText(await getBibleText(sermon.passage, db));
          }
        }
      }
      if (error) {
        console.error("Error fetching sermons:", error);
      }
      setLoading(false);
    }
    getData();
  }, []);

  const sermon = sermons?.[index];
  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };
  const handleNext = () => {
    setIndex((prevIndex) => Math.min(sermons.length - 1, prevIndex + 1));
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!sermon) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>No sermons found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between pb-4">
        <Button
          onPress={handlePrev}
          disabled={index === 0}
          variant="ghost"
          size="icon"
        >
          <ChevronLeft className="text-white" />
        </Button>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-center">{sermon.title}</Text>
          <Text className="text-muted-foreground">{sermon.date}</Text>
        </View>
        <Button
          onPress={handleNext}
          disabled={index === sermons.length - 1}
          variant="ghost"
          size="icon"
        >
          <ChevronRight className="text-white" />
        </Button>
      </View>
      <ScrollView contentContainerClassName="px-4 gap-y-6">
        <View className="flex-row gap-x-4">
          <Button className="flex-1">
            <Text>Watch on YouTube</Text>
          </Button>
          <Button variant="secondary" className="">
            <Download className="text-white" />
          </Button>
        </View>

        {/* Sermon Details */}
        <View className="gap-y-4">
          <View>
            <Text className="text-lg font-semibold mb-1">Passage</Text>
            <Text className="text-base text-muted-foreground">
              {sermon.passage}
            </Text>
            <Text className="text-base text-muted-foreground">
              {passageText}
            </Text>
          </View>
          <View>
            <Text className="text-lg font-semibold mb-1">Summary</Text>
            <Text className="text-base">{sermon.summary}</Text>
          </View>
          <View>
            <Text className="text-lg font-semibold mb-1">Application</Text>
            <Text className="text-base">{sermon.application}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

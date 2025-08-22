import { Link, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Text } from "~/components/ui/text";
import { getBibleTextAsync, getBibleTextSync } from "~/lib/bible";
import { dateToStr } from "~/lib/datetime";
import { ChevronDown } from "~/lib/icons/ChevronDown";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { Download } from "~/lib/icons/Download";
import { supabase } from "~/lib/supabase";
import { Tables } from "~/lib/types";

export default function Screen() {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState<Tables<"sermons">[]>([]);
  const local = useLocalSearchParams();
  const initId = parseInt(local.id);
  const initIndex = Math.max(
    0,
    sermons.findIndex((sermon) => sermon.id == initId)
  );
  const [index, setIndex] = useState(initIndex);
  const sermon = sermons?.[index];
  const [passageText, setPassageText] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setSermons([]);
      const { data, error } = await supabase
        .from("sermons")
        .select()
        .order("date", { ascending: false });
      if (data) {
        setSermons(data);
      }
      if (error) {
        console.error("Error fetching sermons:", error);
      }
      setLoading(false);
    }
    getData();
  }, []);
  useEffect(() => {
    async function getData() {
      if (sermon?.passage) {
        setPassageText(await getBibleTextAsync(sermon.passage, db));
      }
    }
    getData();
  }),
    [sermon];

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
        <Text className="p-8 text-xl">Sermon selected does not exist.</Text>
        <Button onPress={() => router.replace("/sermon/all")}>
          <Text>Return to list</Text>
        </Button>
      </SafeAreaView>
    );
  }
  const watch = async () => {
    if (!sermon.yt_uri) return;
    // Check if the device can open the URL
    const supported = await Linking.canOpenURL(sermon.yt_uri);
    if (supported) {
      await Linking.openURL(sermon.yt_uri);
    } else {
      // console.log(`Don't know how to open this URL: ${sermon.yt_uri}`);
      alert(`Cannot open this URL: ${sermon.yt_uri}`);
    }
  };
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
          <Pressable onPress={() => router.push("/sermon/all")}>
            <Text className="text-muted-foreground">
              {dateToStr(new Date(sermon.date!))}
            </Text>
          </Pressable>
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
          <Button className="flex-1" onPress={watch} disabled={!sermon.yt_uri}>
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
            <PassageText passage={sermon.passage} text={passageText} />
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
        <View className="h-8"></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PassageText({ passage, text }: { passage: string; text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const arrowRotation = isExpanded ? "rotate-180" : "rotate-0";
  const lineClamp = isExpanded ? "line-clamp-none" : "line-clamp-3";
  return (
    <View>
      <Pressable
        onPress={toggleExpand}
        className="flex-row justify-between items-center"
      >
        <Text className="text-muted-foreground font-semibold">{passage}</Text>
        <ChevronDown
          size={22}
          color={"white"}
          className={`transition-transform duration-300 ${arrowRotation}`}
        />
      </Pressable>

      <Text className={`text-muted-foreground ${lineClamp}`}>{text}</Text>
    </View>
  );
}

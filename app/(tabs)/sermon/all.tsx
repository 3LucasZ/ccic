import { Link, router } from "expo-router";
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
import ChevronHeader from "~/components/ChevronHeader";
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
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState<Tables<"sermons">[]>([]);

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

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!sermons) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>No sermons found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ChevronHeader title="All Sermons" />
      <ScrollView contentContainerClassName="px-4 gap-y-6">
        {sermons.map((sermon) => (
          <Sermon
            id={sermon.id}
            title={sermon.title}
            date={sermon.date}
            key={sermon.id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Sermon({
  id,
  title,
  date,
}: {
  id: number;
  title: string;
  date: string | null;
}) {
  return (
    <Pressable onPress={() => router.replace(`/sermon/${id}`)}>
      <View className="flex-1 items-center">
        <Text className="text-xl font-bold text-center">{title}</Text>
        <Text className="text-muted-foreground">
          {date ? dateToStr(new Date(date)) : "N/A"}
        </Text>
      </View>
    </Pressable>
  );
}

import * as React from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link, Redirect, router } from "expo-router";
import { useSession } from "~/lib/ctx";
import { nameToImg } from "~/lib/utils";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import ChevronHeader from "~/components/ChevronHeader";
import { Input } from "~/components/ui/input";
import MyAvatar from "~/components/MyAvatar";
import { useEffect, useState } from "react";
import { Tables } from "~/lib/types";
import { supabase } from "~/lib/supabase";
import { QueryData } from "@supabase/supabase-js";

export const fakeUsers = [
  {
    id: 4,
    name: "Alan Turing",
    avatar_uri: "https://ui.shadcn.com/avatars/01.png",
  },
  {
    id: 5,
    name: "Grace Hopper",
    avatar_uri: "https://ui.shadcn.com/avatars/02.png",
  },
  {
    id: 6,
    name: "John von Neumann",
    avatar_uri: "https://ui.shadcn.com/avatars/03.png",
  },
  {
    id: 7,
    name: "Chris Lee",
    avatar_uri: "",
  },
];
export default function Screen() {
  const { user } = useSession();
  if (!user) return <Redirect href="/" />;

  // console.log(user);
  const [selectedTab, setSelectedTab] = React.useState("buddies");
  const [value, setValue] = useState("");
  const onChangeText = (text: string) => {
    setValue(text);
  };

  // load users, friend reqs
  const [users, setUsers] = useState<Tables<"users">[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSentReqs = supabase
    .from("friend_reqs")
    .select(
      "*, from:users!friend_reqs_from_id_fkey(*), to:users!friend_reqs_to_id_fkey(*)"
    )
    .eq("from.id", user.id);
  type SentReqs = QueryData<typeof fetchSentReqs>;
  const [sentReqs, setSentReqs] = useState<SentReqs>([]);

  const fetchReqs = supabase
    .from("friend_reqs")
    .select(
      "*, from:users!friend_reqs_from_id_fkey(*), to:users!friend_reqs_to_id_fkey(*)"
    )
    .eq("to.id", user.id);
  type Reqs = QueryData<typeof fetchReqs>;
  const [reqs, setReqs] = useState<Reqs>([]);

  useEffect(() => {
    async function init() {
      const { data: d1, error: e1 } = await fetchReqs;
      if (d1) {
        setReqs(d1);
      }
      const { data: d2, error: e2 } = await fetchSentReqs;
      if (d2) {
        setSentReqs(d2);
      }
    }
    init();
  }, []);
  const usersFiltered = users.filter(
    (buddy) => buddy.name.toLowerCase().indexOf(value.toLowerCase()) == 0
  );
  const reqsFiltered = reqs
    .map((req) => req.from)
    .filter((req) => req.name.toLowerCase().indexOf(value.toLowerCase()) == 0);
  const sentReqsFiltered = sentReqs
    .map((req) => req.to)
    .filter((req) => req.name.toLowerCase().indexOf(value.toLowerCase()) == 0);

  return (
    <SafeAreaView className="flex-1 p-4">
      <ChevronHeader title="My Buddies" />
      <Input
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        className="mx-4 mb-4"
      />
      <Tabs
        className="flex-1"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="flex-row mx-4">
          <TabsTrigger value="buddies" className="flex-1">
            <Text>Buddies</Text>
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex-1">
            <Text>Requests</Text>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            <Text>Pending</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buddies" className="flex-1 p-4">
          <UserList
            users={usersFiltered}
            actions={(user: Tables<"users">) => <BuddyActions user={user} />}
            emptyStateMessage={
              usersFiltered
                ? "No users matched your search."
                : "You haven't added any buddies yet."
            }
          />
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="flex-1 p-4">
          <UserList
            users={reqsFiltered}
            actions={(user) => <RequestActions user={user} />}
            emptyStateMessage={
              usersFiltered
                ? "No users matched your search."
                : "You have no new buddy requests."
            }
          />
        </TabsContent>

        {/* Pending Tab */}
        {/* TODO: you should be able to send requests in this tab too! */}
        <TabsContent value="pending" className="flex-1 p-4">
          <UserList
            users={sentReqsFiltered}
            actions={(user) => <PendingActions user={user} />}
            emptyStateMessage={
              usersFiltered
                ? "No users matched your search."
                : "You have no pending requests."
            }
          />
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}
function UserList({
  users,
  actions,
  emptyStateMessage,
}: {
  users: Tables<"users">[];
  actions: (buddy: Tables<"users">) => React.JSX.Element;
  emptyStateMessage: string;
}) {
  if (users.length === 0) {
    return <EmptyState message={emptyStateMessage} />;
  }

  return (
    <ScrollView className="flex-1">
      <View className="gap-y-4">
        {users.map((user) => (
          <UserListItem
            key={user.id}
            name={user.name}
            avatar_uri={user.uri}
            actions={actions(user)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
function UserListItem({
  avatar_uri,
  name,
  actions,
}: {
  avatar_uri: string;
  name: string;
  actions: React.JSX.Element;
}) {
  return (
    <View className="flex-row items-center p-3">
      <MyAvatar name={name} uri={avatar_uri} size={50} />
      <Text className="text-base font-semibold flex-1 ml-4">{name}</Text>
      <View className="flex-row gap-x-2">{actions}</View>
    </View>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <View className="items-center justify-center">
      <Text className="text-muted-foreground">{message}</Text>
    </View>
  );
}

function RequestActions({ user }: { user: Tables<"users"> }) {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onPress={() => console.log("Accepted")}
      >
        <Check className="text-emerald-400 h-6 w-6" />
      </Button>
      {/* <View className="w-2"></View> */}
      <Button
        variant="outline"
        size="icon"
        onPress={() => console.log("Declined")}
      >
        <X className="text-rose-400 h-6 w-6" />
      </Button>
    </>
  );
}

function PendingActions({ user }: { user: Tables<"users"> }) {
  return (
    <Button
      variant="outline"
      size={"sm"}
      onPress={() => console.log(`Cancelled request to ${user.name}`)}
    >
      <Text>Cancel</Text>
    </Button>
  );
}
function BuddyActions({ user }: { user: Tables<"users"> }) {
  return <View></View>;
  return (
    <Button
      variant="outline"
      size="icon"
      onPress={() => console.log("Declined")}
    >
      <X className="text-rose-400 h-6 w-6" />
    </Button>
  );
}

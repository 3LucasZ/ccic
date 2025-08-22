import * as React from "react";
import { Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Check } from "~/lib/icons/Check";
import { X } from "~/lib/icons/X";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link, router } from "expo-router";
import { useSession } from "~/lib/ctx";
import { nameToImg } from "~/lib/utils";
import { ChevronLeft } from "~/lib/icons/ChevronLeft";
import ChevronHeader from "~/components/ChevronHeader";
import { Input } from "~/components/ui/input";
import MyAvatar from "~/components/MyAvatar";

type Buddy = {
  id: number;
  name: string;
  avatar_uri: string;
};

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
  const { session } = useSession();
  const user = session?.user;
  // console.log(user);
  const [selectedTab, setSelectedTab] = React.useState("buddies");
  const [value, setValue] = React.useState("");
  const onChangeText = (text: string) => {
    setValue(text);
  };
  const buddies = fakeUsers.filter(
    (buddy) => buddy.name.toLowerCase().indexOf(value.toLowerCase()) == 0
  );

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
            users={buddies}
            actions={(user: Buddy) => <BuddyActions user={user} />}
            emptyStateMessage={
              buddies
                ? "No users matched your search."
                : "You haven't added any buddies yet."
            }
          />
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="flex-1 p-4">
          <UserList
            users={buddies}
            actions={(user) => <RequestActions user={user} />}
            emptyStateMessage={
              buddies
                ? "No users matched your search."
                : "You have no new buddy requests."
            }
          />
        </TabsContent>

        {/* Pending Tab */}
        {/* TODO: you should be able to send requests in this tab too! */}
        <TabsContent value="pending" className="flex-1 p-4">
          <UserList
            users={buddies}
            actions={(user) => <PendingActions user={user} />}
            emptyStateMessage={
              buddies
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
  users: Buddy[];
  actions: (buddy: Buddy) => React.JSX.Element;
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
            avatar_uri={user.avatar_uri}
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

function RequestActions({ user }: { user: Buddy }) {
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

function PendingActions({ user }: { user: Buddy }) {
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
function BuddyActions({ user }: { user: Buddy }) {
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

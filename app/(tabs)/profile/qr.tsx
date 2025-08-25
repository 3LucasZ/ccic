import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ChevronHeader from "~/components/ChevronHeader";
import { useSession } from "~/lib/ctx";
import { supabase } from "~/lib/supabase";

export default function Screen() {
  // qr code sizing
  const [qrCodeSize, setQrCodeSize] = useState(0);
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    // Set the size to the smaller of the two dimensions to ensure it fits
    const smallerDimension = Math.min(width, height);
    setQrCodeSize(smallerDimension);
  };
  // user
  const { user } = useSession();
  // realtime friend request
  const channel = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "friend_reqs",
        // Filter so the user only gets notifications meant for them
        filter: `to_id=eq.${user?.id}`,
      },
      (payload) => {
        // console.log("New friend request!", payload.new);
        router.replace({
          pathname: `/profile/[req_id]`,
          params: { req_id: payload.new.from_id, direction: "rcv" },
        });
      }
    )
    .subscribe();
  return (
    <SafeAreaView className="flex-1" onLayout={onLayout}>
      <ChevronHeader title="My Buddy Code" />
      <View className="flex-1 items-center justify-center">
        <QRCode
          value={user?.id}
          size={qrCodeSize - 100}
          // logo={user?.uri}
        />
      </View>
    </SafeAreaView>
  );
}

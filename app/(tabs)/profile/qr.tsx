import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
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

export default function Screen() {
  // qr code sizing
  const [qrCodeSize, setQrCodeSize] = useState(0);
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    // Set the size to the smaller of the two dimensions to ensure it fits
    const smallerDimension = Math.min(width, height);
    setQrCodeSize(smallerDimension);
  };
  // data
  const { user } = useSession();
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

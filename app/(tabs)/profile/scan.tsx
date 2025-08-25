import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import ChevronHeader from "~/components/ChevronHeader";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { uidVerify } from "~/lib/utils";
import { router } from "expo-router";

export default function Screen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isInvalidQr, setIsInvalidQr] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to use your camera</Text>
        <Button onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <CameraView
        style={styles.camera}
        facing={"back"}
        onBarcodeScanned={({ data }) => {
          console.log(data);
          if (uidVerify(data)) {
            // replace is very important
            // if we simply "push" the old page will be running and use cam resources
            router.replace({
              pathname: `/profile/[req_id]`,
              params: { req_id: data, direction: "send" },
            });
          } else {
            // console.log("INVALID");
          }
        }}
      >
        <SafeAreaView>
          <ChevronHeader title="Buddy Scanner" />
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

import { Stack } from "expo-router";

export default function SermonStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="buddies" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
      <Stack.Screen name="qr" options={{ headerShown: false }} />
      <Stack.Screen name="[req_id]" options={{ headerShown: false }} />
    </Stack>
  );
}

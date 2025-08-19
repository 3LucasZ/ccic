import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";
import { supabase } from "~/lib/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { Text } from "components/ui/text";
import { Button } from "~/components/ui/button";
import * as Svg from "react-native-svg";
import { Image } from "expo-image";
import { useSession } from "~/lib/ctx";
import { Link, router } from "expo-router";

export default function Screen() {
  GoogleSignin.configure({
    scopes: [],
    webClientId:
      "768678016356-jm2ri85nmj5f4et150ahvlaa1isvt9im.apps.googleusercontent.com",
    iosClientId:
      "768678016356-jm2ri85nmj5f4et150ahvlaa1isvt9im.apps.googleusercontent.com",
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center p-6">
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 128, height: 128 }}
          contentFit="contain"
        />
        <View className="h-8" />
        <Text className="text-3xl font-bold">Login</Text>
        <View className="h-4" />
        <Text className="text-slate-400">Welcome to CCIC!</Text>
        <View className="h-16" />
        <View className="w-full max-w-sm space-y-4 gap-8">
          <GoogleButton />
          <AppleButton />
          <Link href={"/"} asChild>
            <Text className="text-slate-400 text-center">Sign in as Guest</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

function GoogleButton() {
  const { signIn } = useSession();
  return (
    <Button
      className="flex-row"
      onPress={async () => {
        await signIn();
        router.replace("/");
      }}
    >
      <Image
        style={{ width: 24, height: 24 }}
        contentFit="contain"
        source={require("../assets/images/google.svg")}
      />
      <Text className="ml-4 font-semibold">Sign in with Google</Text>
    </Button>
  );
}

function AppleButton() {
  return (
    <Button
      className="flex-row"
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // Sign in via Supabase Auth.
          if (credential.identityToken) {
            const {
              error,
              data: { user },
            } = await supabase.auth.signInWithIdToken({
              provider: "apple",
              token: credential.identityToken,
            });
            console.log(JSON.stringify({ error, user }, null, 2));
            if (!error) {
              // User is signed in.
            }
          } else {
            throw new Error("No identityToken.");
          }
        } catch (e) {
          if (e.code === "ERR_REQUEST_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
    >
      <Image
        style={{ width: 24, height: 24 }}
        contentFit="contain"
        source={require("../assets/images/apple.svg")}
      />
      <Text className="ml-4 font-semibold">Sign in with Apple</Text>
    </Button>
  );
}

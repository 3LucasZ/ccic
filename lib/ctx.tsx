import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { useStorageState } from "./useStorageState";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<{
  signInGoogle: () => Promise<void>;
  signInApple: () => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
  isLoading: boolean;
}>({
  signInGoogle: async () => {},
  signInApple: async () => {},
  signOut: async () => {},
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // session storage
  const sessionStorageKey = "session";
  const [[isLoading, sessionStr], setSessionStr] =
    useStorageState(sessionStorageKey);
  const session = sessionStr ? JSON.parse(sessionStr) : null;
  // (Later if necessary) The empty dependency array ensures this runs only once on mount.
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     console.log("supabase.auth.getSession()", session);
  //   });
  // }, []);
  // return
  return (
    <AuthContext
      value={{
        signInGoogle: async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // console.log(userInfo);
            if (userInfo.data?.idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: userInfo.data.idToken,
              });
              // console.log(data.session);
              setSessionStr(JSON.stringify(data.session));
              try {
                // console.log("insert:", data.user);
                await supabase.from("users").insert({
                  id: data.user?.id,
                  name: data.user?.user_metadata.name,
                  email: data.user?.email,
                  uri: data.user?.user_metadata.picture,
                });
              } catch {}
            } else {
              throw new Error("no ID token present!");
            }
          } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        },
        signInApple: async () => {
          console.log("signInApple");
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // User is signed into Apple
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
                // User is signed into supabase
                // Insert new custom user into supabase
                try {
                  const name =
                    (credential.fullName?.givenName || "") +
                      (credential.fullName?.familyName || "") || "New User";
                  const email = credential.email || "new.user@gmail.com";
                  await supabase.from("users").insert({
                    id: credential.user,
                    name: name,
                    email: email,
                    uri: "",
                  });
                } catch {}
              }
            } else {
              throw new Error("No identityToken.");
            }
          } catch (e) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
              console.error(e, e.code);
            }
          }
        },
        signOut: async () => {
          setSessionStr("");
          await supabase.auth.signOut();
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signOut();
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}

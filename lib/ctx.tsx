import {
  use,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { useStorageState } from "./useStorageState";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "./supabase";
import { Session, User } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<{
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
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
  useEffect(() => {}, []);
  // return
  return (
    <AuthContext
      value={{
        signIn: async () => {
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

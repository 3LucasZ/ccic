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
import { emailToName } from "./utils";
import { Tables } from "./types";

const AuthContext = createContext<{
  // boolean = sign in was successful
  signInGoogle: () => Promise<boolean>;
  signInApple: () => Promise<boolean>;
  signOut: () => Promise<void>;
  session?: Session | null;
  user?: Tables<"users"> | null;
  isLoading: boolean;
}>({
  signInGoogle: async () => false,
  signInApple: async () => false,
  signOut: async () => {},
  session: null,
  user: null,
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
  const [[isLoadingSession, sessionStr], setSessionStr] =
    useStorageState(sessionStorageKey);
  const session: Session = sessionStr ? JSON.parse(sessionStr) : null;
  const [user, setUser] = useState<Tables<"users"> | null>(null);
  // console.log(user);

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   console.log("supabase.auth.getSession()", session);
    // });
    if (session) {
      getUser(session.user.id);
    }
  }, [sessionStr]);
  // return
  const getUser = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single(); // Use .single() to get an object instead of an array
      if (error) {
        setUser(null);
      }
      if (data) {
        setUser(data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      // setLoading(false)
    }
  };
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
              return true;
            } else {
              throw new Error("no ID token present!");
            }
          } catch (e) {
            return false;
          }
        },
        signInApple: async () => {
          // Sign into Apple
          // console.log("signInApple");
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // console.log("credential", credential);
            if (credential.identityToken) {
              // Sign into Supa
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "apple",
                token: credential.identityToken,
              });
              // console.log("supa", JSON.stringify({ error, data }, null, 2));
              if (!error) {
                setSessionStr(JSON.stringify(data.session));
                // Insert new custom user into supabase
                const email = data.user.email || "new.user@gmail.com";
                const name =
                  (credential.fullName?.givenName || "") +
                    (credential.fullName?.familyName || "") ||
                  emailToName(email);
                try {
                  // console.log("Creating new user");
                  await supabase.from("users").insert({
                    id: data.session.user.id,
                    name: name,
                    email: email,
                    uri: "",
                  });
                } catch (e) {
                  console.error(e);
                }
                return true;
              } else {
                console.error(error);
                return false;
              }
            } else {
              throw new Error("No identityToken.");
            }
          } catch (e) {
            console.error(e);
            return false;
          }
        },
        signOut: async () => {
          setSessionStr("");
          await supabase.auth.signOut();
          await GoogleSignin.hasPlayServices();
          await GoogleSignin.signOut();
        },
        session,
        user,
        isLoading: isLoadingSession,
      }}
    >
      {children}
    </AuthContext>
  );
}

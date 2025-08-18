import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fspmohikcswypgukfean.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcG1vaGlrY3N3eXBndWtmZWFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjQwMjUsImV4cCI6MjA3MDkwMDAyNX0.3ILGAFrr80qPfNukYXX_flHL4bpAdGEXwTC5TvuueoM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

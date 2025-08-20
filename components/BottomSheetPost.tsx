import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text } from "components/ui/text";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button } from "./ui/button";
import { supabase } from "~/lib/supabase";
import { useSession } from "~/lib/ctx";
import { Switch } from "./ui/switch";
type BottomSheetPrayProps = {};
const BottomSheetPost = forwardRef<BottomSheet, BottomSheetPrayProps>(
  (props, ref) => {
    const { session } = useSession();
    const user = session?.user;
    const [postTitle, setPostTitle] = useState("");
    const [postText, setPostText] = useState("");
    const [replyEnabled, setReplyEnabled] = useState(false);

    const onSubmit = async () => {
      // console.log(prayerText);
      // await supabase
      //   .from("prayer_reqs")
      //   .insert({ author_id: user?.id, text: prayerText });
    };
    const snapPoints = useMemo(() => ["60%"], []);
    const handleClosePress = () => ref?.current?.close();
    const handleSheetChanges = useCallback((index: number) => {
      // on close
      if (index == -1) {
        Keyboard.dismiss();
      }
    }, []);
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );
    const renderFooter = useCallback(
      (props: any) => (
        <BottomSheetFooter {...props}>
          {/* <View className="flex-row fap-4 p-4">
            <Text>Allow replies?</Text>
            <Switch checked={replyEnabled} onCheckedChange={setReplyEnabled} />
          </View> */}
          <View className="flex-row w-full gap-4 p-4">
            <Button
              className="flex-1 bg-teal-400"
              onPress={async () => {
                if (postText.trim() === "" || postTitle.trim() === "") {
                  alert("Post is missing fields.");
                  return;
                }
                await onSubmit();
                setPostText("");
                handleClosePress();
              }}
            >
              <Text className="">Send</Text>
            </Button>
            <Button
              className="flex-1 bg-red-400"
              onPress={() => {
                setPostText("");
                handleClosePress();
              }}
            >
              <Text>Discard</Text>
            </Button>
          </View>
        </BottomSheetFooter>
      ),
      // CRUCIAL: or else send will not work!
      [postText, replyEnabled]
    );
    return (
      <BottomSheet
        //snapping
        ref={ref}
        onChange={handleSheetChanges}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        //input
        // keyboardBehavior="fillParent"
        // backdrop
        backdropComponent={renderBackdrop}
        //footer
        footerComponent={renderFooter}
        // styling
        backgroundStyle={{
          backgroundColor: "#18181b",
        }}
        handleIndicatorStyle={{ backgroundColor: "#FFF" }}
      >
        <BottomSheetView>
          <Text className="text-xl font-bold text-center">New Post</Text>
          <BottomSheetTextInput
            placeholder={"Post Title"}
            value={postTitle}
            onChangeText={setPostTitle}
            multiline
            className="text-white text-3xl px-4"
            // get rid of red squiggles
            spellCheck={false}
            autoCorrect={false}
          />

          <BottomSheetTextInput
            placeholder={
              "Type post here... \nIdeas: encouragement, devotional, question, announcement, praise"
            }
            value={postText}
            onChangeText={setPostText}
            multiline
            className="text-white text-xl px-4"
            // get rid of red squiggles
            spellCheck={false}
            autoCorrect={false}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
export default BottomSheetPost;

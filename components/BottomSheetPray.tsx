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
type BottomSheetPrayProps = {};
const BottomSheetPray = forwardRef<BottomSheet, BottomSheetPrayProps>(
  (props, ref) => {
    const { session } = useSession();
    const user = session?.user;
    const [prayerText, setPrayerText] = useState("");
    const onSubmit = async () => {
      console.log(prayerText);
      await supabase
        .from("prayer_reqs")
        .insert({ author_id: user?.id, text: prayerText });
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
          <View className="flex-row w-full gap-4 p-4">
            <Button
              className="flex-1 bg-teal-400"
              onPress={async () => {
                if (prayerText.trim() === "") {
                  alert("Prayer request is empty.");
                  return;
                }
                await onSubmit();
                setPrayerText("");
                handleClosePress();
              }}
            >
              <Text className="">Send</Text>
            </Button>
            <Button
              className="flex-1 bg-red-400"
              onPress={() => {
                setPrayerText("");
                handleClosePress();
              }}
            >
              <Text>Discard</Text>
            </Button>
          </View>
        </BottomSheetFooter>
      ),
      // CRUCIAL: or else send will not work!
      [prayerText]
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
          <Text className="text-xl font-bold text-center">Prayer Request</Text>
          <BottomSheetTextInput
            placeholder="Enter prayer here..."
            value={prayerText}
            onChangeText={setPrayerText}
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
export default BottomSheetPray;

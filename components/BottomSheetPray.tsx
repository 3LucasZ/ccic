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
import { StyleSheet, View } from "react-native";
import { Button } from "./ui/button";
type BottomSheetPrayProps = {};
const BottomSheetPray = forwardRef<BottomSheet, BottomSheetPrayProps>(
  (props, ref) => {
    const [value, setValue] = useState("");
    const snapPoints = useMemo(() => ["60%"], []);
    const handleSheetChanges = useCallback((index: number) => {
      // on close
      if (index == -1) {
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
            <Button className="flex-1 bg-teal-400">
              <Text className="">Send</Text>
            </Button>
            <Button className="flex-1 bg-red-400" onPress={() => setValue("")}>
              <Text>Discard</Text>
            </Button>
          </View>
        </BottomSheetFooter>
      ),
      []
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
            value={value}
            onChangeText={setValue}
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

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
    const snapPoints = useMemo(() => ["50%"], []);
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
        <BottomSheetFooter {...props} bottomInset={24}>
          <Button>
            <Text>Send</Text>
          </Button>
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
        keyboardBehavior="fillParent"
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
            style={styles.input}
            placeholder="Click here"
            value={value}
            onChangeText={setValue}
            multiline
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
export default BottomSheetPray;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    // borderRadius: 10,
    fontSize: 24,
    lineHeight: 20,
    padding: 8,
    // backgroundColor: "rgba(151, 151, 151, 0.25)",
    color: "white",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#80f",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});

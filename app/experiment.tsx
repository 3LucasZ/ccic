import React, { useCallback, useMemo, useRef } from "react";
import { View } from "react-native";
import { Text } from "components/ui/text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const App = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        // snapPoints={["100%"]}
        index={-1}
      >
        <BottomSheetView>
          <View>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;

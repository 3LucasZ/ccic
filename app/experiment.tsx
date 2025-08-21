import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const ExpandableText = () => {
  const text =
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure";
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ScrollView className="p-4 bg-gray-100 rounded-lg">
      <View>
        <Text
          className="text-gray-800 leading-relaxed"
          numberOfLines={isExpanded ? undefined : 3}
        >
          {text}
        </Text>
        {!isExpanded && (
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 50, // Adjust the height of the shadow as needed
            }}
            pointerEvents="none"
          />
        )}
      </View>
      <TouchableOpacity onPress={toggleExpand} className="mt-2 self-start">
        <Text className="text-blue-500 font-bold">
          {isExpanded ? "Read Less" : "Read More"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExpandableText;

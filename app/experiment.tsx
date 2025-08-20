// App.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// The data for the Bible verses. This is hardcoded for the example.
const verseData = [
  {
    text: "And after six days Jesus taketh with him Peter, and James, and John his brother, and bringeth them up into a high mountain apart: ",
  },
  {
    text: "and he was transfigured before them; and his face did shine as the sun, and his garments became white as the light. ",
  },
  {
    text: "And behold, there appeared unto them Moses and Elijah talking with him. ",
  },
  {
    text: "And Peter answered, and said unto Jesus, Lord, it is good for us to be here: if thou wilt, I will make here three tabernacles; one for thee, and one for Moses, and one for Elijah. ",
  },
  {
    text: "While he was yet speaking, behold, a bright cloud overshadowed them: and behold, a voice out of the cloud, saying, This is my beloved Son, in whom I am well pleased; hear ye him. ",
  },
  {
    text: "And when the disciples heard it, they fell on their face, and were sore afraid. ",
  },
  {
    text: "And Jesus came and touched them and said, Arise, and be not afraid. ",
  },
  { text: "And lifting up their eyes, they saw no one, save Jesus only. " },
  {
    text: "And as they were coming down from the mountain, Jesus commanded them, saying, Tell the vision to no man, until the Son of man be risen from the dead. ",
  },
  {
    text: "And his disciples asked him, saying, Why then say the scribes that Elijah must first come? ",
  },
  {
    text: "And he answered and said, Elijah indeed cometh, and shall restore all things: ",
  },
  {
    text: "but I say unto you, that Elijah is come already, and they knew him not, but did unto him whatsoever they would. Even so shall the Son of man also suffer of them. ",
  },
  {
    text: "Then understood the disciples that he spake unto them of John the Baptist. ",
  },
];

// Helper function to concatenate the verse data into a single string.
const getFullVerseText = () => {
  return verseData.map((item) => item.text).join("");
};

const fullVerseText = getFullVerseText();

export default function App() {
  // State variable to control the dropdown's expanded/collapsed state.
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state.
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Define the rotation of the arrow icon based on the state.
  const arrowRotation = isExpanded ? "rotate-180" : "rotate-0";

  return (
    // Main container with full-screen, centered, and padded styling.
    <ScrollView className="flex-1 bg-gray-100 p-6">
      <View className="flex-1 justify-center items-center">
        {/* The main card container for the dropdown. */}
        <View className="bg-white rounded-xl shadow-lg w-full max-w-xl p-4">
          {/* Dropdown header/button. Toggles the verses' visibility on press. */}
          <TouchableOpacity
            onPress={toggleExpand}
            className="flex-row justify-between items-center py-2"
          >
            <Text className="text-lg font-bold text-gray-800">
              Matthew 17:1-13
            </Text>
            {/* Simple dropdown arrow icon using a unicode character. */}
            <Text
              className={`text-xl font-bold transition-transform duration-300 ${arrowRotation}`}
            >
              ▼
            </Text>
          </TouchableOpacity>

          {/* Conditional rendering of the verses based on the 'isExpanded' state. */}
          {isExpanded && (
            <View className="mt-4 border-t border-gray-200 pt-4">
              <Text className="text-base text-gray-700 leading-relaxed">
                {fullVerseText}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

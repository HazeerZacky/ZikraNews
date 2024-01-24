// Importing necessary components and hooks from React Native and external libraries
import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";

// Functional component for a mini header with a label
export default function MiniHeader({ label }) {
  // Accessing navigation functionality using the useNavigation hook
  const navigation = useNavigation();

  // Accessing color scheme and theme toggling functionality using the useColorScheme hook
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Rendering the mini header with label
  return (
    // Styling the container view with padding, margin, and flex properties
    <View className="px-4 my-4 justify-between flex-row items-center">
      {/* Displaying the label with specified font, size, and color based on the color scheme */}
      <Text
        style={{
          fontFamily: 'SpaceGroteskBold',
          fontSize: 20,
          color: colorScheme === 'dark' ? '#fff' : '#C10000',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

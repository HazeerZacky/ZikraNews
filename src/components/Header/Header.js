// Importing necessary components and modules from React Native and third-party libraries
import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

// Functional component for the header of the application
export default function Header() {
  // Accessing the navigation object to enable navigation in the app
  const navigation = useNavigation();

  // Accessing color scheme and toggle function from the native color scheme hook
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    // Header container with row layout, space-between alignment, and margin
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
      {/* Logo and App Title */}
      <View>
        <Text
          // Styling for the app title, considering color scheme and text properties
          style={{
            fontFamily: 'SpaceGroteskBold',
            fontSize: 24,
            color: colorScheme === 'dark' ? '#fff' : '#C10000',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Zikra News
        </Text>
      </View>

      {/* Notification Mode Switch and Search Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {/* Text indicating the mode label */}
        <Text
          style={{
            fontFamily: 'SpaceGroteskBold',
            fontSize: 16,
            color: colorScheme === 'dark' ? '#fff' : '#C10000',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Mode
        </Text>
        
        {/* Switch component for toggling between light and dark mode */}
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={toggleColorScheme}
          trackColor={{ false: '#C10000', true: '#fff' }}
          thumbColor={colorScheme === 'dark' ? '#fff' : '#C10000'}
        />
      </View>
    </View>
  );
}

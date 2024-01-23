import { Switch, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

export default function Header() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
      <View>
        <Text
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

      {/* Notification and Search Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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

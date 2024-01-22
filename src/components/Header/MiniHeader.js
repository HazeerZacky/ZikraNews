import { View, Text} from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";


export default function MiniHeader({ label }) {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
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

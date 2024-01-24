import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function ProfileScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <SafeAreaView
    style={{ 
      flex: 1, 
      backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#FFF', 
      marginTop: 20,
    }}>
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 6 }}>
        <View>
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 30,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: '500',
            }}
          >
            Zikra News
          </Text>

          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 15,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: 'bold',
              marginBottom: 10,
            }}
          >
            "Welcome to Zikra News, your go-to source for timely 
            and reliable news updates. Stay informed with our diverse 
            coverage, delivered with journalistic integrity and a commitment 
            to keeping you at the forefront of global events."
          </Text>

          {/* Divider */}
          <View
            style={{
              borderBottomColor: colorScheme === 'dark' ? '#fff' : '#C10000',
              borderBottomWidth: 2,
              marginBottom: 10,
            }}
          />

          {/* Name and Index */}
          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 15,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: '400',
            }}
          >
            Name: M.H. Mohammed Hazeer Zacky
          </Text>
          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 15,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: '400',
            }}
          >
            KU ID: K2370616
          </Text>
          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 15,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: '400',
            }}
          >
            ESOFT ID: E205599
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

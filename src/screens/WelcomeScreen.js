import { View, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Functional component for the welcome screen
export default function WelcomeScreen() {
  // Access the navigation object to navigate between screens
  const navigation = useNavigation();

  return (
    // Image background for the welcome screen
    <ImageBackground
      source={require("../../assets/images/welcome/reportor.jpg")}
      className="flex-1 justify-center items-center pb-6"
    >
      {/* Gradient overlay at the bottom of the image background */}
      <LinearGradient
        colors={["transparent", "rgba(132, 8, 11, 0.95)"]}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Container for the main content */}
      <View className="flex-1 items-center justify-end max-w-[85%]  space-y-4">
        {/* Title text with styling */}
        <Text
          className="font-bold text-4xl shadow-2xl text-white text-center tracking-wider"
          style={{
            fontSize: widthPercentageToDP(9),
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Stay Informed from Day One
        </Text>
        
        {/* Subtitle text with styling */}
        <Text
          className="font-bold text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: widthPercentageToDP(3),
            fontFamily: "SpaceGroteskMedium",
          }}
        >
          Discover the Latest News with our Seamless Onboarding Experience.
        </Text>
      </View>

      {/* Button to navigate to the home tabs */}
      <TouchableOpacity
        className="bg-[#C10000] rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text className="text-base font-bold text-white">Getting Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

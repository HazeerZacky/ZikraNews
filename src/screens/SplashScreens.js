import React, { useEffect, useCallback } from "react";
import { View, Text, Image, ImageBackground, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// SplashScreen component for displaying a splash screen before navigating to the main screen
export default function SplashScreens() {
  const navigation = useNavigation();

  // Load custom fonts using expo-font
  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  // Callback function to hide the splash screen after fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }

    // Navigate to the "Welcome" screen after a delay of 3000 milliseconds (3 seconds)
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 4000);
  }, [fontsLoaded, fontError, navigation]);

  // Run the onLayoutRootView callback on component mount
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  // If fonts are not yet loaded, return null to prevent rendering
  if (!fontsLoaded) {
    return null;
  }

  // Render the splash screen UI
  return (
    <ImageBackground
      source={require("../../assets/images/welcome/news-bg.png")}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* Gradient overlay at the bottom of the image background */}
      <LinearGradient
        colors={["rgba(132, 8, 11, 0.7)", "rgba(132, 8, 11, 0.7)"]}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Main content of the splash screen */}
      <View
        onLayout={onLayoutRootView}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {/* App logo */}
        <Image
          source={require("../../assets/images/welcome/logo.png")}
          style={{ width: 180, height: 180, marginBottom: -40 }}
        />
        
        {/* App name */}
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", textTransform: "uppercase" }}>
          Zikra News
        </Text>
        
        {/* App tagline */}
        <Text style={{ color: "white", fontSize: 10, fontWeight: "normal" }}>
          Worlds No1 News App
        </Text>
      </View>
    </ImageBackground>
  );
}

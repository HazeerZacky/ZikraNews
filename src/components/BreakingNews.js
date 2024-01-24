import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Carousal from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";

// Get the width of the window for carousel configuration
var { width } = Dimensions.get("window");

// BreakingNews component that displays a carousel of breaking news items
export default function BreakingNews({ data, label }) {
  // Access the navigation object from the navigation stack
  const navigation = useNavigation();

  // Handle click on a breaking news item, navigate to NewsDetails screen with item details
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
    // Container View for the BreakingNews component
    <View style={{}}>
      {/* Carousel component to display breaking news items */}
      <Carousal
        data={data}
        // Render each item using BreakingNewsCard component
        renderItem={({ item }) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        // Configuration for the carousel
        firstItem={1}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width * 0.8}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

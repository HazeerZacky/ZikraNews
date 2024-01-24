import { Dimensions, TouchableWithoutFeedback, Image, Text, View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

// Get the device window dimensions
const { width, height } = Dimensions.get("window");

// BreakingNewsCard component receives 'item' and 'handleClick' as props
export default function BreakingNewsCard({ item, handleClick }) {

  // TouchableWithoutFeedback allows the 'onPress' event on the entire card
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      {/* Container for the entire card */}
      <View className="relative">

        {/* Image component for displaying news image */}
        <Image
          source={{
            uri: item.urlToImage || "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.20,
          }}
          resizeMode="cover"
          className="rounded-[12px]"
        />

        {/* LinearGradient for a gradient overlay at the bottom of the image */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />

        {/* Container for text content positioned at the bottom of the card */}
        <View className="absolute bottom-6 left-4 justify-end h-[80%]">

          {/* Nested view for text content */}
          <View>

            {/* Title of the news article with character limit check */}
            <View className="max-w-[98%]">
              <Text
                className="text-white text-base font-semibold capitalize"
              >
                {item.title.length > 60
                  ? item.title.slice(0, 58) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            {/* Author information with character limit check */}
            <View className="">
              <Text className="text-neutral-300 text-sm font-medium text-[14px]">
                {item?.author?.length > 20
                  ? item.author.slice(0, 20) + "..."
                  : item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

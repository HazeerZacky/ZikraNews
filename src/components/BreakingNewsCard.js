import {
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Text,
    View,
  } from "react-native";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  
  const { width, height } = Dimensions.get("window");
  
  export default function BreakingNewsCard({ item, handleClick }) {
  
    return (
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View className="relative">
          <Image
            source={{
              uri:
                item.urlToImage
            }}
            style={{
              width: width * 0.8,
              height: height * 0.20,
            }}
            resizeMode="cover"
            className="rounded-[12px]"
          />
  
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
  
          <View className="absolute bottom-6 left-4 justify-end h-[80%]">
  
            <View>
              <View className="max-w-[98%]">
                <Text
                className="text-white text-base font-semibold capitalize"
                >
                  {item.title.length > 60
                    ? item.title.slice(0, 58) + "..."
                    : item.title.split("-")[0] || "N/A"}
                </Text>
              </View>
  
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
  
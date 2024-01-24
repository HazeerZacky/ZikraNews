import { View, ActivityIndicator } from "react-native";
import React from "react";

// A functional component used to display a loading indicator
export default function Loading(props) {
  return (
    // Container View with flex properties to center the content vertically and horizontally
    <View className="flex-1 justify-center items-center">

      {/* ActivityIndicator component to show a loading spinner */}
      <ActivityIndicator size="large" color="#C10000"/>

    </View>
  );
}

// Importing required components and modules from React Native and other dependencies
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Share, // Import Share from react-native
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Destructuring dimensions for better readability
const { height, width } = Dimensions.get("window");

export default function NewsDetails() {
  // Extracting the item parameter from the route and initializing state variables
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [isBookmarked, toggleBookmark] = useState(false);

  // Function to toggle bookmark status and save the article to AsyncStorage
  const toggleBookmarkAndSave = async () => {
    try {
      // Check if News Article is already in Storage
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already in the bookmarked list
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If the article is not bookmarked, add it to the bookmarked list
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        toggleBookmark(true);
      } else {
        // If the article is already bookmarked, remove it from the list
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        toggleBookmark(false);
      }
    } catch (error) {
      console.log("Error Saving Article", error);
    }
  };

  // useEffect hook to load saved articles from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles)
          : [];

        // Check if the article is already in the bookmarked list
        const isArticleBookmarked = savedArticlesArray.some(
          (savedArticle) => savedArticle.url === item.url
        );

        toggleBookmark(isArticleBookmarked);
      } catch (error) {
        console.log("Error Loading Saved Articles", error);
      }
    };

    loadSavedArticles();
  }, [item.url]);

  // Function to handle sharing the article
  const handleShare = () => {
    Share.share({
      title: item.title, // You can customize the title as needed
      message: item.url,
      url: item.url,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* Header with navigation and action buttons */}
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          {/* Button to go back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Action buttons for sharing and bookmarking */}
        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          {/* Button to share the article */}
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full" onPress={handleShare}>
            <ShareIcon size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>

          {/* Button to toggle bookmark status */}
          <TouchableOpacity
            className="bg-gray-100 p-2 rounded-full"
            onPress={toggleBookmarkAndSave}
          >
            <BookmarkSquareIcon
              size={25}
              color={isBookmarked ? "#C10000" : "gray"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView to display the news article */}
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {/* Loading indicator */}
      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"#C10000"}
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </>
  );
}

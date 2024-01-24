// Importing necessary components and libraries from React Native
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Functional component for displaying a list of news articles
export default function NewsSection({ newsProps }) {
  // Initializing navigation hook from React Navigation
  const navigation = useNavigation();

  // State variables to manage the list of article URLs, bookmark status, and header visibility
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  // State variable to manage the loading status of the main news content
  const [newssMain, setNewsMain] = useState(false);

  // Function to format ISO date to a more readable format
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  // Function to toggle bookmark status and save the article to AsyncStorage
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      // Retrieve saved articles from AsyncStorage
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already bookmarked
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If not bookmarked, add it to the list and update bookmark status
        savedArticlesArray.push(item);
        await AsyncStorage.setItem("savedArticles", JSON.stringify(savedArticlesArray));
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        // If already bookmarked, remove it from the list and update bookmark status
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticlesArray));
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  // useEffect to update the list of URLs when newsProps changes
  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // useFocusEffect to load saved articles when the component is focused
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          // Retrieve saved articles from AsyncStorage
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

          // Check if each URL in 'urlList' exists in the bookmarked list
          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          );

          // Set the bookmark status for all items based on the loaded data
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList]) // Include 'navigation' in the dependencies array if needed
  );

  // Function to handle click events and navigate to NewsDetails screen
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // FlatList renderItem function to render each news item
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        {/* News Item Container */}
        <View className="flex-row justify-start w-[100%] shadow-sm">
          {/* Image */}
          <Image
            source={{
              uri:
                item.urlToImage ||
                "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            style={{ width: hp(9), height: hp(10) }}
            resizeMode="cover"
            className="rounded-lg"
          />

          {/* Content */}
          <View className="w-[70%] pl-4 justify-center space-y-1">
            {/* Author */}
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item?.author?.length > 20
                ? item.author.slice(0, 20) + "..."
                : item.author}
            </Text>

            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white "
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50
                ? item.title.slice(0, 50) + "..."
                : item.title}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Save */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              {/* Bookmark Icon */}
              <BookmarkSquareIcon
                color={bookmarkStatus[index] ? "#C10000" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Main component rendering the News Section
  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      {/* Header (if any) */}

      {/* FlatList to display the list of news items */}
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

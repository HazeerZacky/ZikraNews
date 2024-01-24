import { View, Text, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useColorScheme } from "nativewind"; // Consider commenting on what "nativewind" is, if it's a custom library or part of your project structure.

// Importing functions for fetching breaking and recommended news from an external source (NewsApi).
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";

// Importing hooks from the react-query library.
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// Components for UI elements.
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/Header/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import NewsSection from '../components/NewsSection/NewsSection';

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [page, setPage] = useState(1); // Track the page number for pagination

  // Breaking News
  const { isLoading: isBreakingNewsLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching breaking news", error);
    },
  });

  // Recommended News
  const { isLoading: isRecommendedNewsLoading } = useQuery({
    queryKey: ["recommendedNews"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      setRecommendedNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching recommended news", error);
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <Header />

      {/* BreakingNews Section */}
      {isBreakingNewsLoading ? (
        <Loading />
      ) : (
        <View className="">
          <MiniHeader label="Breaking News" />
          <BreakingNews label="Breaking News" data={breakingNews} />
        </View>
      )}

      {/* Recommended News Section */}
      <View>
        <MiniHeader label="Recommended News" />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp(80),
          }}
        >
          {isRecommendedNewsLoading ? (
            <Loading />
          ) : (
            <NewsSection label="Recommendation" newsProps={recommendedNews} />
          )}
        </ScrollView>
      </View>

      {/* Placeholder Text */}
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
}

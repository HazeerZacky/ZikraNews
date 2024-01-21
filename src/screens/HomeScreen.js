import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from "nativewind";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi"
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header/Header';



export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [breakingNews, SetBreakingNews] = useState([]);
  const [recommendedNews, SetRecommendedNews] = useState([]);

  // Breaking News
  const { isLoading: isBreakingNewsLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      SetBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching breaking news", error);
    },
  });

  // Breaking News
  const { isLoading: isRecomendedNewsLoading } = useQuery({
    queryKey: ["recomendedNewss"],
    queryFn: fetchRecommendedNews,
    onSuccess: (data) => {
      SetRecommendedNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching recommended news", error);
    },
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <Header />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}
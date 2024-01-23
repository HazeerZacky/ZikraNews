import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories, newsData } from "../constants";

import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BreakingNews from "../components/BreakingNews";
import Header from "../components/Header/Header";

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] =
    useState("Architecture");
  const [newsMain, setNewsMain] = useState([]);
  const [discoverNews, setDiscoverNews] = useState([]);


  useEffect(() => {
    console.log("active category", activeCategory);
  }, [activeCategory]);

  const handleChangeCategory = (category) => {
    // getRecipes(category);
    setActiveCategory(category);
    setDiscoverNews([]);
    console.log("category", category);
  };

  const { isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory], // Include the category as part of the key
    queryFn: () => fetchDiscoverNews(activeCategory), // You can skip the query if the category is "business"
    onSuccess: (data) => {
      // Filter out articles with title "[Removed]"
      const filteredNews = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setDiscoverNews(filteredNews);
    },
    onError: (error) => {
      console.log("Error fetching discover news", error);
    },
  });

  return (
    <SafeAreaView className="pt-8 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View>
        {/* Header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 30,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: 'bold',
            }}
          >
            Discover
          </Text>

          <Text
            style={{
              fontFamily: 'SpaceGroteskBold',
              fontSize: 15,
              color: colorScheme === 'dark' ? '#fff' : '#C10000',
              fontWeight: 'bold',
            }}
          >
            News from all over the world
          </Text>
        </View>
        
        {/* Search */}
        <View className="mx-4 mb-8 flex-row p-2 py-3 justify-between items-center bg-neutral-100 rounded-full">
          <TouchableOpacity className="pl-2">
            <MagnifyingGlassIcon size="25" color="gray" />
          </TouchableOpacity>
          <TextInput
            // onChangeText={handleTextDebounce}
            placeholder="Search for news"
            placeholderTextColor={"gray"}
            className="pl-4 flex-1 font-medium text-black tracking-wider"
          />
        </View>

        {/* Categories */}
        <View className="flex-row mx-4">
          <CategoriesCard
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View className="h-full">
          {/* News */}
          <View className="my-4 mx-4 flex-row justify-between items-center">
            <Text
              style={{
                fontFamily: 'SpaceGroteskBold',
                fontSize: 16,
                color: colorScheme === 'dark' ? '#fff' : '#C10000',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Discover
            </Text>
          </View>

          {isDiscoverLoading ? (
          <Loading />
        ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}
            >
              <NewsSection
                categories={categories}
                newsProps={discoverNews}
                label="Discovery"
              />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Importing necessary components and modules from React Native and other libraries
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { categories } from "../constants";

// Importing custom components and icons
import CategoriesCard from "../components/CategoriesCard";
import NewsSection from "../components/NewsSection/NewsSection";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { fetchDiscoverNews } from "../../utils/NewsApi";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
export default function DiscoverScreen() {
  // Navigation and color scheme handling
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // State variables for managing the active category and news data
  const [activeCategory, setActiveCategory] = useState("business");
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("Architecture");
  const [newsMain, setNewsMain] = useState([]);
  const [discoverNews, setDiscoverNews] = useState([]);

  // Log active category whenever it changes
  useEffect(() => {
    console.log("active category", activeCategory);
  }, [activeCategory]);

  // Handle category change
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setDiscoverNews([]);
  };

  // UseQuery hook to fetch discover news
  const { isLoading: isDiscoverLoading } = useQuery({
    queryKey: ["discoverNews", activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
    onSuccess: (data) => {
      const filteredNews = data.articles.filter(
        (article) => article.title !== "[Removed]"
      );
      setDiscoverNews(filteredNews);
    },
    onError: (error) => {
      console.log("Error fetching discover news", error);
    },
  });

  // Render the DiscoverScreen component
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

          {/* Loading indicator or NewsSection based on data availability */}
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

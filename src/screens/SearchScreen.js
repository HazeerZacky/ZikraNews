import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
import { fetchSearchNews } from "../../utils/NewsApi";
import NewsSection from "../components/NewsSection/NewsSection";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  // React Navigation hook for navigation
  const navigation = useNavigation();

  // State variables for managing search functionality
  const [loading, setLoading] = useState(false); // Loading state for displaying loading indicators
  const [results, setResults] = useState([]); // State to store search results
  const [searchInput, setSearchInput] = useState(""); // State to track user's search input

  // Function to handle search based on user input
  const handleSearch = async (search) => {
    // Perform search only if the input is valid
    if (search && search.length > 2) {
      setLoading(true); // Set loading state to true while fetching results
      setResults([]); // Clear previous search results

      try {
        // Fetch news data based on the search input
        const data = await fetchSearchNews(search);

        console.log("We got our search results");
        setLoading(false); // Set loading state to false after fetching results

        // If valid data is received, update the results state
        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false); // Set loading state to false in case of an error
      }
    }
  };

  // Debounce the search function to avoid excessive API requests while typing
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  // Function to clear search input and results
  const clearSearch = () => {
    setSearchInput("");
    setResults([]);
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {/* Search Input */}
      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg">
        <TextInput
          value={searchInput}
          onChangeText={(text) => {
            setSearchInput(text);
            handleTextDebounce(text); // Debounce the search function while typing
          }}
          placeholder="Search for your Favorite news"
          placeholderTextColor={"gray"}
          className=" font-medium text-black tracking-wider p-1 pr-1"
        />
        <TouchableOpacity onPress={clearSearch}>
          <XMarkIcon size="25" color="#C10000" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      <View className="mx-4 mb-4 ">
        <Text
          className="text-xl dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results.length} News
        </Text>
      </View>

      {/* ScrollView for displaying search results */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        {/* Display search results using the NewsSection component */}
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}

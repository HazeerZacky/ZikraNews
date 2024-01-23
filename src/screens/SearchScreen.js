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
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);

      try {
        const data = await fetchSearchNews(search);

        console.log("We got our search results");
        setLoading(false);

        if (data && data.articles) {
          setResults(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

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
            handleTextDebounce(text);
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

      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}

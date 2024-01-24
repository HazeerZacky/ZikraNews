import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Component for displaying category cards with the ability to change the active category
export default function CategoriesCard({
  categories,              // List of category objects
  activeCategory,          // Currently active category
  handleChangeCategory,   // Function to handle category change
}) {
  return (
    <View>
      {/* Horizontal ScrollView for displaying category cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{
          paddingRight: 20,
        }}
      >
        {categories.map((category, index) => {
          // Check if the current category is the active one
          let isActive = category.title === activeCategory;

          // Define CSS classes based on whether the category is active or not
          let activeButtonClass = isActive
            ? "bg-red-700 "
            : "bg-black/10 dark:bg-neutral-400 ";
          let activeTextClass = isActive
            ? "text-white "
            : "text-gray-600 dark:text-neutral-900 ";

          return (
            // TouchableOpacity for handling category selection
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.title)}
              className="flex items-center space-y-1"
            >
              {/* View for styling the category card */}
              <View
                className={
                  "rounded-full py-2 px-4 " + activeButtonClass
                }
              >
                {/* Text component for displaying the category title */}
                <Text
                  className={"capitalize " + activeTextClass}
                  style={{
                    fontSize: hp(1.6),
                  }}
                >
                  {category.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

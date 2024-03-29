import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreens from '../screens/SplashScreens';
import NewsDetails from '../screens/NewsDetails';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Create Tab and Stack navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  // Use the useColorScheme hook to get the color scheme and toggle function
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // Define the TabNavigator component
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            // Define icon names based on the route
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Discover') {
              iconName = 'compass';
            } else if (route.name === 'Saved') {
              iconName = 'bookmark';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Info') {
              iconName = 'alert-circle-sharp';
            }

            // Define size for the icons
            const customizeSize = 25;

            // Return Ionicons component with dynamically set color
            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? (colorScheme === 'dark' ? '#fff' : '#C10000') : 'gray'}
              />
            );
          },

          // Set active and inactive tint colors, label style, and background color
          tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#C10000',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'SpaceGroteskMedium',
          },
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          },
        })}
      >
        {/* Define individual screens for each tab */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Info" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  // Main Navigation Container
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Define individual screens for the Stack Navigator */}
        <Stack.Screen name="Splash" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

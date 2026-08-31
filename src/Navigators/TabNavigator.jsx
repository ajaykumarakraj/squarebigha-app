import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchScreen';
import UserListScreen from '../Screens/UserListScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 20,
          height: 65,
          paddingBottom: Platform.OS === 'ios' ? 15 : 10,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },

        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: 'gray',

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'List') {
            iconName = 'list-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={28}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="List"
        component={UserListScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
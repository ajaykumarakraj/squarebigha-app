import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import TabNavigator from './TabNavigator';
import React from 'react';
import SettingScreen from "../Screens/SettingScreen"
import SearchScreen from "../Screens/SearchScreen"
import FilterScreen from "../Screens/FilterScreen"
import DetailScreen from "../Screens/DetailScreen"
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                {/* Tab Navigator as main screen */}
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />

                {/* Extra screens that can be pushed on top of tabs */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="setting" component={SettingScreen} />
                <Stack.Screen name="search" component={SearchScreen} />
                <Stack.Screen name="filter" component={FilterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="detail" component={DetailScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

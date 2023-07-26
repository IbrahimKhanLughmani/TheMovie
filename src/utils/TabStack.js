import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SearchedMovies from '../screens/SearchedMovies';
import MediaScreen from '../screens/MediaScreen';
import MoreScreen from '../screens/MoreScreen';
import colors from '../../theme/colors';
import DashScreen from '../screens/DashScreen';

const Tab = createBottomTabNavigator();
const Watch = createStackNavigator();

function WatchStack() {
  return (
    <Watch.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,          
      })}>
      <Watch.Screen initialRouteName="HomeScreen" name="HomeScreen" component={HomeScreen}/>
      <Watch.Screen name="SearchedMovies" component={SearchedMovies}/>
    </Watch.Navigator>
  );
};

export const TabStack = () => {
  const tabSize = 20
  const activeTabSize = 25

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: colors.purple}}>
      <Tab.Navigator
        initialRouteName="WatchStack"
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: { 
            backgroundColor: colors.purple,
            height: 60,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            paddingBottom: 10,
            borderTopWidth: 0,
            position: 'absolute',
          },
          tabBarLabelStyle: {color: colors.lightPurple},
        })}>
        <Tab.Screen 
          name="DashScreen" 
          component={DashScreen} 
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({focused}) => ( focused ? <Image source={require("../assets/dash-2.png")} style={{width: activeTabSize, height: activeTabSize, marginTop: 10}} /> : <Image source={require("../assets/dash.png")} style={{width: tabSize, height: tabSize, marginTop: 10}} /> ),
          }}
        />
        <Tab.Screen 
          name="WatchStack" 
          component={WatchStack} 
          options={{
            tabBarLabel: 'Watch',
            tabBarIcon: ({focused}) => ( focused ? <Image source={require("../assets/home.png")} style={{width: activeTabSize, height: activeTabSize, marginTop: 10}} /> : <Image source={require("../assets/home-2.png")} style={{width: tabSize, height: tabSize, marginTop: 10}} /> ),
          }}
        />
        <Tab.Screen 
          name="MediaScreen" 
          component={MediaScreen} 
          options={{
            tabBarLabel: 'Media Library',
            tabBarIcon: ({focused}) => ( focused ? <Image source={require("../assets/folder.png")} style={{width: activeTabSize, height: activeTabSize, marginTop: 10}} /> : <Image source={require("../assets/folder-2.png")} style={{width: tabSize, height: tabSize, marginTop: 10}} /> ),
          }}
        />
        <Tab.Screen 
          name="MoreScreen" 
          component={MoreScreen} 
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({focused}) => ( focused ? <Image source={require("../assets/list-2.png")} style={{width: activeTabSize, height: activeTabSize, marginTop: 10}} /> : <Image source={require("../assets/list.png")} style={{width: tabSize, height: tabSize, marginTop: 10}} /> ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
};
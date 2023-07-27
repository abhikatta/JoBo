import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import FavoritesScreen from "../Screens/FavoritesScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import BooksScreen from "../Screens/BooksScreen";
import SettingScreen from "../Screens/SettingScreen";
import NewJoBoScreen from "../Screens/NewJoBoScreen";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{ tabBarStyle: styles.navBar }}>
      <Tab.Screen
        name="Home"
        component={BooksScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navIconView}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "maroon" : "black",
                }}
                source={require("../assets/icons/home.png")}
              />
              <Text
                style={{ color: focused ? "maroon" : "black", fontSize: 12 }}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navIconView}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "maroon" : "black",
                }}
                source={require("../assets/icons/favorites.png")}
              />
              <Text
                style={{ color: focused ? "maroon" : "black", fontSize: 12 }}>
                FAVORITES
              </Text>
            </View>
          ),
        }}
        name="Favorites"
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="JoBo "
        component={NewJoBoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <Image
                source={require("../assets/icons/new.png")}
                resizeMode="contain"
                style={{
                  height: 60,
                  width: 60,
                  top: -10,
                  backgroundColor: "#dddddd",
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 20,
                  tintColor: "black",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navIconView}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "maroon" : "black",
                }}
                source={require("../assets/icons/profile.png")}
              />
              <Text
                style={{
                  color: focused ? "maroon" : "black",
                  fontSize: 12,
                }}>
                PROFILE
              </Text>
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.navIconView}>
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "maroon" : "black",
                }}
                source={require("../assets/icons/settings.png")}
              />
              <Text
                style={{ color: focused ? "maroon" : "black", fontSize: 12 }}>
                SETTINGS
              </Text>
            </View>
          ),
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
const styles = StyleSheet.create({
  navBar: {
    borderRadius: 15,

    position: "absolute",
    bottom: 10,
    height: 70,
    left: 20,
    right: 20,
    backgroundColor: "#dddddd",
    elevation: 5,
    shadowColor: "maroon",
  },
  navIconView: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
});

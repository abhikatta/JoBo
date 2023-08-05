import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Image, View } from "react-native";
import React from "react";
import FavoritesScreen from "../Screens/FavoritesScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import BooksScreen from "../Screens/BooksScreen";
import SettingScreen from "../Screens/SettingScreen";
import CameraScreen from "../Screens/CameraScreen";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "../styles";

const Tabs = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        backBehavior="history"
        screenOptions={{
          tabBarStyle: styles.navBar,
          tabBarHideOnKeyboard: true,
          tabBarIconStyle: {
            top: "10%",
            padding: "10%",
            marginBottom: "10%",
            marginTop: "10%",
          },
          tabBarLabelStyle: {
            bottom: "10%",
          },
          tabBarActiveTintColor: "maroon",
        }}>
        <Tab.Screen
          name="HOME"
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
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="FAVORITES"
          options={{
            unmountOnBlur: true,

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
              </View>
            ),
          }}
          component={FavoritesScreen}
        />
        <Tab.Screen
          name="NEW JOBO"
          component={CameraScreen}
          options={{
            unmountOnBlur: true,
            tabBarStyle: { display: "none" },
            tabBarActiveBackgroundColor: "maroon",
            tabBarIcon: ({ focused }) => (
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
                  tintColor: focused ? "maroon" : "black",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          children={navigation}
          options={{
            unmountOnBlur: true,

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
              </View>
            ),
          }}
          name="PROFILE"
          component={ProfileScreen}
        />
        <Tab.Screen
          name="SETTINGS"
          component={SettingScreen}
          options={{
            unmountOnBlur: true,

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
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;

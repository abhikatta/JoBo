import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { account } from "../appwrite/appwrite";
import App from "../App";
import SplashScreen from "./SplashScreen";

const ProfileScreen = ({ navigation, route }) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ animation: "simple_push" }}>
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={ProfileHomePage}
        />
        {/* When user is logged in, disable Login and Signup components */}
        <Stack.Screen
          name="LogOut"
          options={{ headerShown: false }}
          component={LogOut}
        />
        <Stack.Screen
          name="App"
          options={{ headerShown: false }}
          component={App}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const ProfileHomePage = ({ navigation }) => {
  const [userName, setUserName] = useState(" ");

  useEffect(() => {
    async function getUser() {
      try {
        let user = await account.get();
        setUserName(user.name);
      } catch (error) {
        setUserName("Something went wrong");
      }
    }
    getUser();
  }, [userName]);

  return (
    <View style={styles.container}>
      <Text style={styles.textProfileScreen}>{userName}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LogOut")}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};
export const LogOut = ({ navigation, route }) => {
  const logout = async () => {
    try {
      await account.deleteSession("current");
      alert("Logged out!");
      navigation.navigate("App");
      route;
    } catch (error) {
      Alert.alert("Error!", "Something Went Wrong. Please try again later.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <View>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  textProfileScreen: {
    textAlign: "left",
    top: -5,
    backgroundColor: "beige",
  },
  container: {
    flex: 1,
    marginTop: "50%",
    flexDirection: "column",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
    marginVertical: "2%",
  },
  TextInput: {
    padding: "3%",

    borderWidth: 1,
    marginHorizontal: "10%",
    marginVertical: "2%",
    borderRadius: 5,
    borderBottomColor: "#00aaff",
    borderTopColor: "gray",
    borderLeftColor: "gray",
    borderColor: "gray",
  },
  showPassword: {
    alignContent: "center",
    marginLeft: "10%",
  },
});

export default ProfileScreen;

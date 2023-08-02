import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import Logout from "../Authentication/Logout";
import { styles } from "../Authentication/styles";
import State from "../appwrite/registration";

const Stack = createNativeStackNavigator();
export const ProfileScreen = ({ navigation, route }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          options={{ headerTintColor: "purple" }}
          component={ProfileHomePage}
        />
        <Stack.Screen
          name="Logout"
          options={{ headerTintColor: "teal" }}
          component={Logout}
        />
        <Stack.Screen
          name="Login"
          options={{ headerTintColor: "purple" }}
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerTintColor: "purple" }}
          component={Signup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const ProfileHomePage = ({ navigation }) => {
  const { state } = State();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (state.account !== null) {
    setIsLoggedIn(!isLoggedIn);
  }
  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}>
            <Text>LogIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}>
            <Text>SignUp</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Logout")}>
            <Text>LogOut</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

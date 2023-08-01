import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Login } from "../appwrite/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignUp } from "../appwrite/SignUp";
const Stack = createNativeStackNavigator();

export const ProfileScreen = ({ navigation, route }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

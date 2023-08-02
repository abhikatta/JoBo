import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import State from "../appwrite/registration";
const Logout = ({ navigation }) => {
  const { logout, state } = State();
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully!");
      console.log(state.account);
      navigation.goBack();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <View>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
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
export default Logout;

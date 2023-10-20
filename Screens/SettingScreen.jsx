import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// TODO:
const SettingScreen = () => {
  const [theme, setTheme] = useState("light");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
      }}>
      <Text
        style={{
          alignSelf: "center",
        }}>
        This is the Settings Page
      </Text>
      {/* <TouchableOpacity
        onPress={() => {
          setTheme("light" ? "dark" : "light");
          console.log(theme);
        }}>
        <Text>DarkMode</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SettingScreen;

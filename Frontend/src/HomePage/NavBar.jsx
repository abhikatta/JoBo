import React, { useState } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const NavBar = () => {
  const buttons = {
    heart: "Favorites",
    book: "Books",
    plus: "JoBo",
    gear: "Settings",
    male: "Profile",
  };
  return (
    <View>
      <View style={styles.navbar}>
        {/* since I wrote the button in dict/map/object it can be directed implemented as an object entry as follows: */}
        {Object.entries(buttons).map(([key, value]) => (
          <View>
            <Icon.Button
              name={key}
              key={key}
              // size={iconButton === "plus" ? 50 : 30}
              // 👆 above line causes some on-button-touch bug

              size={styles.iconButton.size}
              // somehow this works:
              backgroundColor="transparent"
              color={styles.iconButton.color}
              style={styles.iconButton}
              onLongPress={() => alert("Long pressing")}
              onPress={() => alert("This is a button")}
            />
            {<Text style={{ textAlign: "center" }}>{value}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
};
export default NavBar;

const styles = StyleSheet.create({
  iconButton: {
    marginLeft: 5,
    // some bug fix for the icons:
    marginRight: -5,
    width: 60,
    justifyContent: "center",
    color: "#22aadd",
    size: 30,
  },
  navbar: {
    marginTop: "10%",
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "row",
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfilePage from "../ProfilePage/ProfilePage";
import SettingsPage from "../SettingsPage/SettingPage";
import BooksPage from "../BooksPage/BooksPage";
import NewJoBoPage from "../BooksPage/NewJoBoPage";
import FavoritesPage from "../BooksPage/FavoritesPage";
const NavBar = () => {
  const buttons = {
    heart: { name: "Favorites", page: FavoritesPage },
    book: { name: "Books", page: BooksPage },
    plus: { name: "JoBo", page: NewJoBoPage },
    gear: { name: "Settings", page: SettingsPage },
    male: { name: "Profile", page: ProfilePage },
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
            {
              <Text style={{ textAlign: "center", marginBottom: 7 }}>
                {value}
              </Text>
            }
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
    justifyContent: "space-evenly",
    // alignContent: "center",
    flexDirection: "row",
  },
});

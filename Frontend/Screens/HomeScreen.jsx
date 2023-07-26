import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingPage";
import BooksPage from "./BooksPage";
import NewJoBoPage from "./NewJoBoPage";
import FavoritesPage from "./FavoritesPage";
const NavBar = ({ navigation }) => {
  const iconNames = ["heart", "book", "plus", "gear", "male"];
  const buttonNames = ["Favorties", "Books", "JoBo", "Settings", "Profile"];
  const pages = [
    FavoritesPage,
    BooksPage,
    NewJoBoPage,
    SettingsPage,
    ProfilePage,
  ];
  return (
    <View style={styles.main}>
      <View style={styles.navbar}>
        <View style={styles.iconButton}>
          <Icon.Button
            name={iconNames[0]}
            size={styles.iconButton.size}
            backgroundColor="transparent"
            color={styles.iconButton.color}
            style={styles.iconButton}
            onLongPress={() => alert("Long pressing")}
            onPress={() => () => navigation.navigate(FavoritesPage)}
          />
          {
            <Text style={{ textAlign: "center", marginBottom: 7 }}>
              {buttonNames[0]}
            </Text>
          }
        </View>
        <View style={styles.iconButton}>
          <Icon.Button
            name={iconNames[1]}
            size={styles.iconButton.size}
            backgroundColor="transparent"
            color={styles.iconButton.color}
            style={styles.iconButton}
            onLongPress={() => alert("Long pressing")}
            onPress={() => () => navigation.navigate(pages[1])}
          />
          {
            <Text style={{ textAlign: "center", marginBottom: 7 }}>
              {buttonNames[1]}
            </Text>
          }
        </View>
        <View style={styles.iconButton}>
          <Icon.Button
            name={iconNames[2]}
            size={styles.iconButton.size}
            backgroundColor="transparent"
            color={styles.iconButton.color}
            style={styles.iconButton}
            onLongPress={() => alert("Long pressing")}
            onPress={() => () => navigation.navigate(pages[2])}
          />
          {
            <Text style={{ textAlign: "center", marginBottom: 7 }}>
              {buttonNames[2]}
            </Text>
          }
        </View>
        <View style={styles.iconButton}>
          <Icon.Button
            name={iconNames[3]}
            size={styles.iconButton.size}
            backgroundColor="transparent"
            color={styles.iconButton.color}
            style={styles.iconButton}
            onLongPress={() => alert("Long pressing")}
            onPress={() => () => navigation.navigate(pages[3])}
          />
          {
            <Text style={{ textAlign: "center", marginBottom: 7 }}>
              {buttonNames[3]}
            </Text>
          }
        </View>
        <View style={styles.iconButton}>
          <Icon.Button
            name={iconNames[4]}
            size={styles.iconButton.size}
            backgroundColor="transparent"
            color={styles.iconButton.color}
            style={styles.iconButton}
            onLongPress={() => alert("Long pressing")}
            onPress={() => () => navigation.navigate(pages[4])}
          />
          {
            <Text style={{ textAlign: "center", marginBottom: 7 }}>
              {buttonNames[4]}
            </Text>
          }
        </View>
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
    backgroundColor: "#e2eede",
    borderRadius: 20,
    marginHorizontal: 10,
    height: 60,
    justifyContent: "center",

    flexDirection: "row",
  },
  main: {
    marginTop: "10%",
    flex: 1,
  },
  navbar: {},
});

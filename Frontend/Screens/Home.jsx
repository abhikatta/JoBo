import { View, StyleSheet } from "react-native";
import React from "react";
import NavBar from "./HomeScreen";

const Home = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <View style={styles.navbar}>
        <NavBar />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    marginTop: "10%",
    flex: 1,
  },
  navbar: {
    backgroundColor: "#e2eede",
    borderRadius: 20,
    marginHorizontal: 10,

    height: 60,
    justifyContent: "center",
  },
});

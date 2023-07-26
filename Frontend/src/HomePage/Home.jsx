import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import NavBar from "./NavBar";

const Home = () => {
  let Ttext = "Home Screen";
  return (
    <View style={styles.main}>
      {/* <Camera> */}
      <NavBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    marginTop: "10%",
  },
});

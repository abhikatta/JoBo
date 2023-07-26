import { View, Text } from "react-native";
import React from "react";
import NavBar from "./HomeScreen";

const BooksPage = ({ navigation }) => {
  return (
    <View>
      <Text>Tis is the BooksPage</Text>
      <NavBar />
    </View>
  );
};

export default BooksPage;

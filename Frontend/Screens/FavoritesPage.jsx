import { View, Text, Button } from "react-native";
import React from "react";
import NavBar from "./HomeScreen";

const FavoritesPage = ({ navigation }) => {
  return (
    <View>
      <Text>This is the FavoritesPage</Text>
      <Button title="GO Back" onPress={() => navigation.goBack()}></Button>
    </View>
  );
};

export default FavoritesPage;

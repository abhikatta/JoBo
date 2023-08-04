import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { JoBoText } from "./CameraScreen";

import { storage } from "../appwrite/appwrite";
const BooksScreen = ({ navigation }) => {
  // async function loadBooks() {
  // const books = await storage.listFiles("64ca5cf0c2f5a5cae817");

  const values = [...JoBoText.imagePaths];
  for (let index = 0; index < 30; index++) {
    const element = "test" + index;
    values.push(element);
  }
  // }
  const Card = () => {
    return values.map((text, index) => (
      <View key={index} style={newstyles.card}>
        <View style={newstyles.optionBar}>
          <TouchableOpacity style={newstyles.option}>
            <Image
              style={newstyles.option}
              resizeMode="contain"
              source={require("../assets/icons/like.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={newstyles.option}>
            <Image
              style={newstyles.option}
              resizeMode="contain"
              source={require("../assets/icons/edit.png")}
            />
          </TouchableOpacity>
        </View>
        <TextInput style={newstyles.text}>{text}</TextInput>
      </View>
    ));
  };
  return (
    <View style={newstyles.main}>
      <Text style={[newstyles.text, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        <Card />
      </ScrollView>
    </View>
  );
};

export const newstyles = StyleSheet.create({
  main: {
    marginTop: "10%",
    flexDirection: "column",
    marginHorizontal: "5%",
    marginBottom: "15%",
  },
  card: {
    backgroundColor: "#ccddee",
    shadowColor: "#ccddee",
    elevation: 6,
    resizeMode: "contain",
    borderRadius: 10,

    marginVertical: 5,
  },
  option: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    width: 30,
  },
  optionBar: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal: "5%",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default BooksScreen;

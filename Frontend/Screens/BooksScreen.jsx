import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { JoBoText } from "./CameraScreen";
import { storage } from "../appwrite/appwrite";
import { styles } from "../styles";
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
    return values.map((homeText, index) => (
      <View key={index} style={styles.homeCard}>
        <View style={styles.homeOptionBar}>
          <TouchableOpacity style={styles.cardOption}>
            <Image
              style={styles.cardOption}
              resizeMode="contain"
              source={require("../assets/icons/like.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardOption}>
            <Image
              style={styles.cardOption}
              resizeMode="contain"
              source={require("../assets/icons/edit.png")}
            />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.homeText}>{homeText}</TextInput>
      </View>
    ));
  };
  return (
    <View style={styles.homeMain}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        <Card />
      </ScrollView>
    </View>
  );
};

export default BooksScreen;

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { JoBoText } from "./CameraScreen";
// import { storage } from "../appwrite/appwrite";

import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";

const BooksScreen = ({ navigation }) => {
  // async function loadBooks() {
  // const books = await storage.listFiles("64ca5cf0c2f5a5cae817");

  const values = [...JoBoText.OCRTEXT];
  for (let index = 0; index < 7; index++) {
    const element = "ocr test text " + index;
    values.push(element);
  }

  return (
    <View style={styles.homeMain}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        {values.map((text, index) => (
          <View key={index}>
            <Card text={text} favs={favs} index={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BooksScreen;

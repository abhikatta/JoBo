import React from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
// import { JoBoText } from "./CameraScreen";
// import { storage } from "../appwrite/appwrite";
import entries from "../journal_test_entries/entries";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";

const BooksScreen = ({ navigation }) => {
  // async function loadBooks() {
  // const books = await storage.listFiles("64ca5cf0c2f5a5cae817");
  const values = [];

  values.push(entries.entry1);
  values.push(entries.entry2);
  values.push(entries.entry3);
  values.push(entries.entry4);
  values.push(entries.entry5);
  values.push(entries.entry6);
  const addNewJournal = () => {
    return values.push("Write your journal here");
  };
  return (
    <View style={styles.homeMain}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <TouchableOpacity onPress={() => addNewJournal()}>
        <Text>+Add </Text>
      </TouchableOpacity>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        {values.map((text, index) => (
          <View key={index}>
            <Card text={text} date={"11.10.23"} favs={favs} index={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BooksScreen;

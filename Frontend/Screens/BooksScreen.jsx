import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
// import { JoBoText } from "./CameraScreen";
// import { storage } from "../appwrite/appwrite";
import entries from "../journal_test_entries/entries";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";

const BooksScreen = ({ navigation }) => {
  // async function loadBooks() {
  // const books = await storage.listFiles("64ca5cf0c2f5a5cae817");
  // const values = [];
  const [values, setValues] = useState([
    entries.entry2,
    entries.entry1,
    entries.entry3,
    entries.entry4,
    entries.entry5,
    entries.entry6,
  ]);

  const addNewJournal = () => {
    const newJournalEntry = "Write your journal here..."; // New entry text
    setValues((prevValues) => [newJournalEntry, ...prevValues]);
  };
  const deleteJournal = (index) => {
    setValues((prevValues) => prevValues.filter(index));
  };
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Pad single digit day, month, hours, and minutes with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
  };
  return (
    <View style={styles.homeMain}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <TouchableOpacity onPress={addNewJournal} style={styles.button}>
        <Text>Type a new journal</Text>
      </TouchableOpacity>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        {values.map((text, index) => (
          <View key={index}>
            <Card
              text={text}
              date={getCurrentDate()}
              favs={favs}
              index={index}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BooksScreen;

import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import entries from "../journal_test_entries/entries";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

const BooksScreen = () => {
  const [userDB, setUserDB] = useState(
    (auth.currentUser && `users/${auth.currentUser.uid}/journals`) || null
  );

  useEffect(() => {
    if (auth.currentUser) {
      setUserDB(`users/${auth.currentUser.uid}/journals`);
    }
  }, [auth.currentUser]);
  const [values, setValues] = useState(Object.values(entries));
  // [entries.entry2,
  // entries.entry1,
  // entries.entry3,
  // entries.entry4,
  // entries.entry5,
  // entries.entry6,
  // ]);

  const addNewJournal = async () => {
    const newJournalEntry = "khjdsgfhjdshjfgdsjh f fagh";
    setValues((prevValues) => [newJournalEntry, ...prevValues]);
    for (const entry of values) {
      const newJournalEntry = {
        entry_text: entry.entry_text, // Assuming each entry is a string, modify this based on your data structure
        id: entry.id,
        timestamp: serverTimestamp(), // Server timestamp for the entry
      };
      values[entry] = newJournalEntry;
    }
    try {
      // Loop through each journal entry in the values state
      for (const entry of values) {
        const newJournalEntry = {
          entry_text: entry.entry_text, // Assuming each entry is a string, modify this based on your data structure
          id: entry.id,
          timestamp: serverTimestamp(), // Server timestamp for the entry
        };

        // Add the journal entry to the "notes" collection in Firebase Firestore
        await addDoc(
          collection(db, `users/${auth.currentUser.uid}/journals`),
          newJournalEntry
        );
        console.log(
          "Journal entry added to Firebase Firestore:",
          newJournalEntry
        );
      }
      console.log("All journal entries uploaded to Firebase Firestore.");
    } catch (error) {
      console.error("Error uploading journal entries to Firestore: ", error);
    }
  };

  const deleteJournal = (id) => {
    setValues((prevValues) => prevValues.filter(id));
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
        {values.map((entry, index) => (
          <View key={index}>
            <Card
              id={entry.id}
              deleteJournal={deleteJournal}
              text={entry.entry_text}
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

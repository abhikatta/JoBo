import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
// import entries from "../journal_test_entries/entries";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";
import {
  addDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, journalsCollection } from "../Firebase/firebase";

const BooksScreen = () => {
  const [values, setValues] = useState([]);
  const [user, setUser] = useState(
    !auth.currentUser.isAnonymous && auth.currentUser
  );

  useEffect(() => {
    try {
      user && getJournals() && console.log("Journals fetched.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", error.message);
    }
  }, [auth.currentUser]);

  const createNewJournal = async () => {
    const journal = {
      entry_text: "add a journal",
      user_id: auth.currentUser.uid,

      timestamp: serverTimestamp(),
    };
    addNewJournal(journal);
  };

  const addNewJournal = async (journalEntry) => {
    try {
      await addDoc(journalsCollection, journalEntry);
      console.log("Journal entry added to Firebase Firestore:", journalEntry);
      setValues((prevValues) => [journalEntry, ...prevValues]);
    } catch (error) {
      console.error("Error uploading journal entry to Firestore:", error);
      Alert.alert(
        "Error!",
        "Something went wrong. Check your internet connection and try again."
      );
    }
  };

  // TODO:
  const deleteJournal = async (id) => {
    try {
      console.log("Journal delete function isn't implemented yet!");
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error!", "Failed to delete the journal entry.", error);
    }
  };

  const getJournals = async () => {
    if (auth.currentUser.isAnonymous) {
      console.log("In guest mode");
      Alert.alert(
        "Error getting data!",
        "You're in Guest mode, login to get your journals."
      );
      return;
    } else {
      try {
        const q = query(
          journalsCollection,
          where("id", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const journals = querySnapshot.docs.map((doc) => {
          return {
            id: doc.user_id,
            timestamp: doc.timestamp,
            ...doc.data(),
          };
        });

        setValues(journals);
        console.log("Journals retrieved from Firebase Firestore:", journals);
      } catch (error) {
        console.error("Error getting journal entries from Firestore:", error);
        Alert.alert("Error getting data!", "Something went wrong.");
      }
    }
  };

  return (
    <View style={styles.homeMain}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Journalized Notes
      </Text>
      <TouchableOpacity onPress={createNewJournal} style={styles.button}>
        <Text>Type a new journal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getJournals} style={styles.button}>
        <Text>get Journal notes</Text>
      </TouchableOpacity>

      <ScrollView style={{ marginBottom: "16.5%" }}>
        {values.map((entry, index) => (
          <View key={index}>
            <Card
              id={entry.id}
              deleteJournal={deleteJournal}
              text={entry.entry_text}
              // updateJournal={update}
              date={entry.timestamp.toString()}
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

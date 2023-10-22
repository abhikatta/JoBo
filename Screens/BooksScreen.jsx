import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";
import {
  addDoc,
  doc,
  getDocs,
  query,
  deleteDoc,
  serverTimestamp,
  setDoc,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { auth, db, journalsCollection } from "../Firebase/firebase";

const BooksScreen = () => {
  const [values, setValues] = useState([]);
  const [user, setUser] = useState(
    !auth.currentUser.isAnonymous && auth.currentUser
  );
  async function LoadModel() {
    try {
      const response = await fetch(
        "https://proxy-hugging-api.vercel.app/api/image"
      );
      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(journalsCollection, () => {
      LoadModel();
      getJournals();
    });
    return () => {
      // Unsubscribe from the snapshot listener when the component is unmounted
      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  // LoadModel();

  // }, []);
  // useEffect(() => {
  //   try {
  //     user && getJournals() && console.log("Journals fetched.");
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Error!", error.message);
  //   }
  // }, [auth.currentUser]);

  const createNewJournal = async () => {
    const journal = {
      entry_text: "Write a new journal...",
      id: !auth.currentUser.isAnonymous
        ? auth.currentUser.uid
        : auth.currentUser.getIdToken(),
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

  const deleteJournal = async (doc_id) => {
    try {
      Alert.alert("Warning!", "Are you sure you want to delete the journal?", [
        {
          text: "Yes",
          onPress: async () => {
            const docRef = doc(journalsCollection, doc_id);
            await deleteDoc(docRef);
            console.log("Journal deleted successfully.");
          },
        },
        { text: "No", onPress: () => null },
      ]);
      console.log(doc_id);
      console.log("Journal delete function isn't implemented yet!");
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error!", "Failed to delete the journal entry.", error);
    }
  };
  // TODO:
  // FIX UPDATE FUNCTION:
  const updateJournal = async (text, doc_id) => {
    try {
      const docRef = doc(journalsCollection, doc_id);
      await setDoc(docRef, { entry_text: text }, { merge: true });
    } catch (error) {
      console.error("Error updating journal entry:", error);
      Alert.alert("Error!", "Failed to update the journal entry.", error);
    }
  };

  const getJournals = async () => {
    // console.log("In guest mode");
    // Alert.alert(
    //   "Error getting data!",
    //   "You're in Guest mode, login to get your journals."
    // );
    // return;
    try {
      if (auth.currentUser.isAnonymous) {
        const q = query(
          journalsCollection,
          where("id", "==", auth.currentUser.getIdToken())
        );

        const querySnapshot = await getDocs(q);
        const journals = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            doc_id: doc.id,
            liked: data.liked,
            timestamp: data.timestamp,
            ...data,
          };
        });

        setValues(journals);
      } else {
        const q = query(
          journalsCollection,
          where("id", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const journals = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            doc_id: doc.id,
            liked: data.liked,
            timestamp: data.timestamp,
            ...data,
          };
        });

        setValues(journals);
        console.log("Journals retrieved from Firebase Firestore:", journals);
      }
    } catch (error) {
      console.error("Error getting journal entries from Firestore:", error);
      Alert.alert("Error getting data!", "Something went wrong.");
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

      <ScrollView style={{ height: "75%" }}>
        {values.map((entry, index) => (
          <View key={index}>
            <Card
              id={entry.doc_id}
              deleteJournal={deleteJournal}
              text={JSON.parse(entry.entry_text)}
              updateJournal={updateJournal}
              doc_id={entry.doc_id}
              liked={entry.liked}
              date={entry.timestamp.toDate().toString()}
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

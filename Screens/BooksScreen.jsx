import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { encryptText, decryptText } from "../utils/encrpytion";
import { Card } from "../components/Card";
import { styles } from "../styles";
import { favs } from "./FavoritesScreen";
import {
  doc,
  getDocs,
  query,
  deleteDoc,
  where,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { auth, journalsCollection } from "../Firebase/firebase";
import LOGGEDINTITLECOMPONENT from "../components/LoggedInTitle";
import { timestampToDate } from "../utils/timeConverter";
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
    if (!auth.currentUser.isAnonymous) {
      try {
        const unsubscribe = onSnapshot(journalsCollection, () => {
          getJournals();
        });
        return () => {
          // Unsubscribe from the snapshot listener when the component is unmounted
          unsubscribe();
        };
      } catch (error) {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } else {
      return;
    }
  }, [auth.currentUser]);

  useEffect(() => {
    try {
      user && getJournals() && console.log("Journals fetched.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", error.message);
    }
  }, [auth.currentUser]);

  const createNewJournal = async () => {
    var originalText = "Type a new journal..";

    try {
      const journal = {
        // entry_text: JSON.stringify(encryptText(originalText)),
        entry_text: encryptText(originalText),
        id: auth.currentUser.uid,
        liked: false,
        timestamp: serverTimestamp(),
      };
      if (journal) {
        await addDoc(journalsCollection, journal);
        console.log("Journal entry added to Firebase Firestore:", journal);
        setValues((prevValues) => [journal, ...prevValues]);
      }
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
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      Alert.alert("Error!", "Failed to delete the journal entry.", error);
    }
  };
  // TODO:
  // FIX UPDATE FUNCTION:
  const updateJournal = async (text, doc_id) => {
    try {
      console.log(`Updated ${doc_id} with ${text}`);
      const docRef = doc(journalsCollection, doc_id);
      await updateDoc(docRef, {
        entry_text: encryptText(text),
      });
    } catch (error) {
      console.error("Error updating journal entry:", error);
      Alert.alert("Error!", "Failed to update the journal entry.", error);
    }
  };

  const deleteAllJournals = async () => {
    try {
      if (auth.currentUser.isAnonymous) {
        return;
      } else {
        Alert.alert(
          "Delete all JoBos?",
          "Are you absolutely sure you want to delete all your JoBos? This action is irreversible!",
          [
            {
              text: "Yes",
              onPress: async () => {
                const querySnapshot = await getDocs(
                  query(
                    journalsCollection,
                    where("id", "==", auth.currentUser.uid)
                  )
                );

                querySnapshot.forEach((doc) => {
                  deleteDoc(doc.ref)
                    .then(() => {
                      console.log(`Document ${doc.id} successfully deleted!`);
                    })
                    .catch((error) => {
                      console.error(
                        `Error deleting document: ${doc.id}\n`,
                        error
                      );
                    });
                });
              },
            },
            {
              text: "Maybe not",
              onPress: () => null,
            },
          ]
        );
      }
    } catch (error) {
      console.error(
        "Error trying to delete all journal entries from Firestore:",
        error
      );
      Alert.alert("Error deleting data!", "Something went wrong.");
    }
  };

  const getJournals = async () => {
    try {
      if (auth.currentUser.isAnonymous) {
        return;
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
            entry_text: decryptText(data.entry_text),
            // ...decryptText(data),
          };
        });

        setValues(journals);
        console.log("Journals retrieved from Firebase Firestore:", values);
      }
    } catch (error) {
      console.error("Error getting journal entries from Firestore:", error);
      Alert.alert("Error getting data!", "Something went wrong.");
    }
  };

  return values.length > 0 ? (
    <View style={styles.JoBos}>
      <LOGGEDINTITLECOMPONENT />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => createNewJournal()}>
          <Text style={styles.text}>Write a new journal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteAllJournals()}>
          <Text style={styles.text}>Delete all journals</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          height: Platform.OS === "android" ? "75%" : "auto",
          width: "100%",
        }}>
        {values.map((entry, index) => (
          <View key={index}>
            <Card
              id={entry.doc_id}
              deleteJournal={deleteJournal}
              text={entry.entry_text}
              updateJournal={updateJournal}
              doc_id={entry.doc_id}
              liked={entry.liked}
              date={timestampToDate(entry.timestamp?.seconds)}
              favs={favs}
              index={index}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  ) : (
    <View style={[styles.homeMain, styles.noJoboCard]}>
      <Text style={{ textAlign: "center" }}>
        You don't have any JoBo yet. Click on{" "}
        <Text
          style={{ color: "#00aafa", fontStyle: "italic", fontWeight: "bold" }}>
          NEW JOBO{"  "}
        </Text>
        <Text>to get started!</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createNewJournal()}>
        <Text style={styles.text}>Write a new journal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BooksScreen;

import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { Card } from "../components/Card";
import {
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, journalsCollection } from "../Firebase/firebase";
import { decryptText, encryptText } from "../utils/encrpytion";
import { timestampToDate } from "../utils/timeConverter";

const FavoritesPage = () => {
  const [favs, setFavs] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(journalsCollection, () => {
      getJournals();
    });
    return () => {
      // Unsubscribe from the snapshot listener when the component is unmounted
      unsubscribe();
    };
  }, []);

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

  const getJournals = async () => {
    try {
      if (auth.currentUser.isAnonymous) {
        return;
      } else {
        const q = query(
          journalsCollection,
          where("liked", "==", true),
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
          // return {
          //   id: data.id,
          //   doc_id: doc.id,
          //   liked: data.liked,
          //   timestamp: data.timestamp,
          //   ...data,
          // };
        });

        setFavs(journals);
        console.log("Journals retrieved from Firebase Firestore:", journals);
      }
    } catch (error) {
      console.error("Error getting journal entries from Firestore:", error);
      Alert.alert("Error getting data!", "Something went wrong.");
    }
  };

  return favs.length === 0 ? (
    <View style={styles.JoBos}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Favorite Notes
      </Text>
      <View
        style={{
          marginTop: "50%",
          alignItems: "center",
        }}>
        <TouchableOpacity>
          <Image
            style={styles.noFavoritesImage}
            source={require("../assets/backgrounds/no_favorites_background.png")}></Image>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.JoBos}>
      <Text style={[styles.homeText, { fontSize: 30, marginLeft: 5 }]}>
        Your Favorite Notes
      </Text>
      <ScrollView style={{ height: "92%", width: "100%" }}>
        {/* <Card text={text} index={index} /> */}
        {favs.map((entry, index) => (
          <View key={index}>
            <Card
              id={entry.doc_id}
              text={entry.entry_text}
              doc_id={entry.doc_id}
              updateJournal={updateJournal}
              liked={entry.liked}
              date={timestampToDate(entry.timestamp?.seconds)}
              index={index}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesPage;

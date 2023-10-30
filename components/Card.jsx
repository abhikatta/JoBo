import { useState } from "react";
import { styles } from "../styles";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { journalsCollection } from "../Firebase/firebase";

const handlelike = async (doc_id, liked) => {
  const journalRef = doc(journalsCollection, doc_id);

  try {
    await updateDoc(journalRef, {
      liked: !liked, // Toggle the liked status
    });
    console.log("Liked status updated successfully!");
  } catch (error) {
    console.error("Error updating liked status: ", error);
  }
};

export const Card = ({
  text,
  deleteJournal,
  updateJournal,
  date,
  liked,
  doc_id,
  index,
}) => {
  const [editable, setEditable] = useState(false);
  const [newText, setNewText] = useState(text);
  const handleTextChange = async () => {
    if (editable) {
      setNewText(newText);
      await updateJournal(newText, doc_id);
      //   Alert.alert(
      //     "Publish Changes?",
      //     "Are you sure you want to edit changes to your journal?",
      //     [
      //       {
      //         text: "Yes",
      //         onPress: async () => {
      //           setNewText(newText);
      //           await updateJournal(newText, doc_id);
      //         },
      //       },
      //       {
      //         text: "No",
      //         onPress: async () => {
      //           setNewText(text);
      //           return;
      //         },
      //       },
      //     ]
      //   );
    }
  };

  return (
    <View key={index} style={styles.homeCard}>
      <View style={styles.homeOptionBar}>
        {deleteJournal && (
          // for favorites
          <TouchableOpacity
            style={styles.cardOption}
            onPress={() => deleteJournal(doc_id)}>
            <Image
              style={styles.cardOption}
              resizeMode="contain"
              source={require("../assets/icons/delete.png")}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.cardOption}
          onPress={() => {
            if (!editable) {
              setEditable((preEditable) => !preEditable);
            } else {
              setEditable((preEditable) => !preEditable);

              handleTextChange();
            }
          }}>
          <Image
            style={styles.cardOption}
            resizeMode="contain"
            source={require("../assets/icons/edit.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardOption}
          onPress={() => handlelike(doc_id, liked)}>
          <Image
            style={styles.cardOption}
            resizeMode="contain"
            source={
              liked
                ? require("../assets/icons/liked.png")
                : require("../assets/icons/like.png")
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.homeOptionBar,
          {
            alignContent: "flex-start",
            alignSelf: "flex-start",
            alignItems: "flex-start",
          },
        ]}>
        <TextInput
          editable={editable}
          style={{ paddingTop: 10, alignSelf: "flex-start" }}>
          {date}
        </TextInput>
      </View>
      <TextInput
        editable={editable}
        onChangeText={(e) => setNewText(e)}
        selectionColor={"cyan"}
        multiline={true}
        numberOfLines={7}
        cursorColor={"#837ed4"}
        style={styles.homeText}>
        {text}
      </TextInput>
    </View>
  );
};

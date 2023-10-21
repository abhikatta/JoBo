import { useState } from "react";
import { styles } from "../styles";

import { View, TouchableOpacity, Text, Image, TextInput } from "react-native";

export const Card = ({
  text,
  deleteJournal,
  updateJournal,
  date,
  doc_id,
  index,
}) => {
  const [editable, setEditable] = useState(false);

  return (
    <View key={index} style={styles.homeCard}>
      <View style={styles.homeOptionBar}>
        <TouchableOpacity
          style={styles.cardOption}
          onPress={() => deleteJournal(doc_id)}>
          <Image
            style={styles.cardOption}
            resizeMode="contain"
            source={require("../assets/icons/delete.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardOption}
          onPress={() =>
            setEditable((preEditable) => {
              !preEditable;
            })
          }>
          <Image
            style={styles.cardOption}
            resizeMode="contain"
            source={require("../assets/icons/edit.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardOption}>
          <Image
            style={styles.cardOption}
            resizeMode="contain"
            source={require("../assets/icons/like.png")}
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
          onChangeText={updateJournal}
          style={{ paddingTop: 10, alignSelf: "flex-start" }}>
          {date}
        </TextInput>
      </View>
      <TextInput
        editable={editable}
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

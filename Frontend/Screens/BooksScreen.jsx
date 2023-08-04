import React from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { JoBoText } from "./CameraScreen";
import { styles } from "../styles";
const BooksScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.booksMain}>
        {/* booksColumn container: */}
        <View style={styles.booksColumn}>
          {JoBoText.imagePaths.map((image, index) => (
            <View key={index}>{image}</View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default BooksScreen;
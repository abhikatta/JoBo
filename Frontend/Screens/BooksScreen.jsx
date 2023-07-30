import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { JoBoText } from "./CameraScreen";
const BooksScreen = () => {
  return (
    <View style={styles.main}>
      {/* columns container: */}
      <View style={styles.columns}>
        {JoBoText.value.map((text, index) => (
          <Text key={index}>{index + " : " + text}</Text>
        ))}
      </View>
    </View>
  );
};
export default BooksScreen;

const styles = StyleSheet.create({
  main: { height: "100%", width: "100%" },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainerRow: {
    padding: 10,
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
    marginVertical: "2%",
  },
});

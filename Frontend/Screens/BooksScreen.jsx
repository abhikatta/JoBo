import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { JoBoText } from "./CameraScreen";

const BooksScreen = () => {
  const [data, setData] = useState("");
  console.log(data);
  const API = "http://10.74.30.242:5000/returnjson";
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(console.log("loading"));
  }, []);
  //   const res = async DocumentPicker.pick({
  //     type: [DocumentPicker.types.allFiles],
  // });
  this.setState({ singleFile: res });

  return (
    <View style={styles.main}>
      {/* columns container: */}
      <View style={styles.columns}>
        {JoBoText.imagePaths.map((image, index) => (
          <View key={index}>{image}</View>
        ))}
      </View>
      <Text style={styles.text}>{data.Text}</Text>
    </View>
  );
};
export default BooksScreen;

const styles = StyleSheet.create({
  main: {
    height: "100%",
    backgroundColor: "#223344",
    width: "100%",
  },
  text: {
    color: "#eeddff",
  },
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

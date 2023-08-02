import React from "react";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { JoBoText } from "./CameraScreen";
const BooksScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.main}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }></ScrollView>
      {/* columns container: */}
      <View style={styles.columns}>
        {JoBoText.imagePaths.map((image, index) => (
          <View key={index}>{image}</View>
        ))}
      </View>
    </View>
  );
};
export default BooksScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  text: {
    color: "#eeddff",
  },
  columns: {
    flex: 1,
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
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

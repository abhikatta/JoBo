import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles";
import { Card } from "../components/Card";
import { JoBoText } from "./CameraScreen";
const FavoritesPage = ({ navigation }) => {
  const [nofavs, setNofavs] = useState(false);
  const favs = [];
  return !nofavs ? (
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
  ) : (
    <View style={styles.homeMain}>
      <ScrollView style={{ marginBottom: "16.5%" }}>
        {favs.map((text, index) => (
          <View key={index}>
            <Card text={text} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesPage;

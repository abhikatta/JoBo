import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles";
import { Card } from "../components/Card";
import { JoBoText } from "./CameraScreen";
let favs = [];
const FavoritesPage = ({ navigation }) => {
  return !favs ? (
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
            <Card text={text} index={index} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesPage;

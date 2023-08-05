import { styles } from "../styles";

const { View, TouchableOpacity, Image, TextInput } = require("react-native");

export const Card = ({ text, index }) => {
  return (
    <View key={index} style={styles.homeCard}>
      <View style={styles.homeOptionBar}>
        <TouchableOpacity style={styles.cardOption}>
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
      <TextInput style={styles.homeText}>{text}</TextInput>
    </View>
  );
};

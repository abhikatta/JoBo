import { Alert, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { auth } from "../Firebase/firebase";
import { styles } from "../styles";
import { useState } from "react";

const ProfileScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(
    auth.currentUser && auth.currentUser
  );
  async function logout() {
    Alert.alert("Logout & Exit?", "", [
      {
        text: "Yes",
        onPress: async () => {
          auth.signOut();
          console.log("Deleted Current Session");
        },
      },
      { text: "No", onPress: () => null },
    ]);
  }
  return (
    <View>
      <Text style={styles.TextInput}>
        Username:{" "}
        {userDetails.displayName === null
          ? auth.currentUser.email.split("@")[0]
          : auth.currentUser.displayName}
      </Text>
      <Text style={styles.TextInput}>Email ID: {userDetails.email}</Text>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

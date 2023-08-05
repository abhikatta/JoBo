import { Alert, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { account } from "../appwrite/appwrite";
import { styles } from "../styles";
import { State } from "../State";

const ProfileScreen = ({ navigation }) => {
  function user() {
    const currentUserDetails = { ...State };
    return currentUserDetails;
  }

  async function logout() {
    await account.deleteSession("current");
    console.log("Deleted Current Session");
    setIsLoggedin(false);
    Alert.alert("Logout & Exit?", "", [
      {
        text: "Yes",
        onPress: () => {
          BackHandler.exitApp();
        },
      },
      { text: "No", onPress: () => null },
    ]);
  }
  userDetails = user();
  return (
    <View>
      <Text style={styles.TextInput}>
        Username: {userDetails.currentUser.username}
      </Text>
      <Text style={styles.TextInput}>
        Email ID: {userDetails.currentUser.email}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

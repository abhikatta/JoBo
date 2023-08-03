import { Alert, Text, TouchableOpacity, View, BackHandler } from "react-native";
import { account } from "../appwrite/appwrite";
import { styles } from "../styles";
import { State } from "../State";

const ProfileScreen = ({ navigation }) => {
  function user() {
    return State.currentUser.username;
  }
  async function logout() {
    await account.deleteSession("current");
    console.log("Deleted Current Session");
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
  return (
    <View>
      <Text>{user()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout();
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

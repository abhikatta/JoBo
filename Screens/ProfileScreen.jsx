import { Alert, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../Firebase/firebase";
import { styles } from "../styles";

const ProfileScreen = () => {
  async function logout() {
    Alert.alert("Logout & Exit?", "Are you sure you want to logout?", [
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
        {auth.currentUser.displayName === null
          ? auth.currentUser.email
            ? auth.currentUser.email.split("@")[0]
            : "Guest"
          : auth.currentUser.displayName}
      </Text>
      <Text style={styles.TextInput}>
        Email ID:{" "}
        {auth.currentUser.email ? auth.currentUser.email : "guest@gmail.com"}
      </Text>
      {!auth.currentUser.email ? (
        <>
          <Text style={[styles.TextInput, { color: "red" }]}>
            NOTE: All the data will be lost when you logout.
          </Text>
        </>
      ) : (
        ""
      )}
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;

import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../Firebase/firebase";

const RESETUSERNAME = () => {
  const [username, setUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");

  const clearCredentials = () => {
    setUsername("");
    setConfirmUsername("");
  };
  const handleUsernameReset = () => {
    if (
      username.length > 0 &&
      confirmUsername.length > 0 &&
      username === confirmUsername
    ) {
      try {
        updateProfile(auth.currentUser, { displayName: username });
        clearCredentials();
      } catch (error) {
        Alert.alert(
          "Error",
          "Something went wrong while trying to reset username."
        );
        clearCredentials();
      }
    } else {
      Alert.alert("Error", "Usernames must match and not be empty.");
      clearCredentials();
    }
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: "20%",
        flexDirection: "column",
        paddingTop: "20%",
      }}>
      <TextInput
        value={username}
        numberOfLines={1}
        maxLength={40}
        secureTextEntry={secureUsername}
        autoCapitalize="none"
        placeholder="Username"
        autoComplete="off"
        style={styles.TextInput}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        value={confirmUsername}
        numberOfLines={1}
        maxLength={40}
        autoComplete="off"
        autoCapitalize="none"
        secureTextEntry={secureUsername}
        placeholder="Confirm Username"
        style={styles.TextInput}
        onChangeText={(username) => setConfirmUsername(username)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUsernameReset}>
        <Text style={styles.text}>Reset Username</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RESETUSERNAME;

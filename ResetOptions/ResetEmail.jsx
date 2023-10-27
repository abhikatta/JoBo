import { updateEmail } from "firebase/auth";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../Firebase/firebase";
import { useState } from "react";
import { styles } from "../styles";

const RESETEMAIl = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const clearCredentials = () => {
    setEmail("");
    setConfirmEmail("");
  };
  const handleEmailReset = () => {
    if (email.length > 0 && confirmEmail.length > 0 && email === confirmEmail) {
      try {
        updateEmail(auth.currentUser, email);
        Alert.alert("Success.", "Your email has been successfully changed.");
        clearCredentials();
      } catch (error) {
        Alert.alert(
          "Error",
          "Something went wrong while trying to reset email."
        );
        clearCredentials();
      }
    } else {
      Alert.alert("Error", "Emails must match and not be empty.");
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
        value={email}
        numberOfLines={1}
        maxLength={40}
        autoCapitalize="none"
        placeholder="Email"
        autoComplete="off"
        style={styles.TextInput}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        value={confirmEmail}
        numberOfLines={1}
        maxLength={40}
        autoComplete="off"
        autoCapitalize="none"
        placeholder="Confirm Email"
        style={styles.TextInput}
        onChangeText={(email) => setConfirmEmail(email)}
      />
      <TouchableOpacity style={styles.button} onPress={handleEmailReset}>
        <Text style={styles.text}>Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RESETEMAIl;

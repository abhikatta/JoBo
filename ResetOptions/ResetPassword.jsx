import { updatePassword } from "firebase/auth";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { auth } from "../Firebase/firebase";
import { useState } from "react";

const RESETPASSWORD = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handlePassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };
  const clearCredentials = () => {
    setPassword("");
    setConfirmPassword("");
  };
  const handlePasswordReset = () => {
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      try {
        updatePassword(auth.currentUser, password);
        clearCredentials();
      } catch (error) {
        Alert.alert(
          "Error",
          "Something went wrong while trying to reset password."
        );
        clearCredentials();
      }
    } else {
      Alert.alert("Error", "Passwords must match and not be empty.");
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
        value={password}
        numberOfLines={1}
        maxLength={40}
        secureTextEntry={securePassword}
        autoCapitalize="none"
        placeholder="Password"
        autoComplete="off"
        style={styles.TextInput}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        value={confirmPassword}
        numberOfLines={1}
        maxLength={40}
        autoComplete="off"
        autoCapitalize="none"
        secureTextEntry={securePassword}
        placeholder="Confirm Password"
        style={styles.TextInput}
        onChangeText={(password) => setConfirmPassword(password)}
      />
      <BouncyCheckbox
        style={styles.showPassword}
        onPress={handlePassword}
        isChecked={false}
        fillColor="#00aaff"
        size={20}
        textStyle={{
          textDecorationLine: "none",
          width: 100,
          fontSize: 13,
        }}
        text="Show Password"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.text}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RESETPASSWORD;

import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { styles } from "../styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";

const SIGNUPMAIN = ({ signup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handlePassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };
  const clearCredentials = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: "20%",
        flexDirection: "column",
        paddingTop: "20%",
      }}>
      <Text
        style={{
          fontSize: 22,
          marginHorizontal: "10%",
          bottom: "5%",
          justifyContent: "center",
          alignContent: "center",
        }}>
        Don't have an account? {"\n"}
        create one.{"\n"}
      </Text>
      <TextInput
        value={email}
        numberOfLines={1}
        maxLength={40}
        placeholder="Email"
        autoComplete="email"
        style={styles.TextInput}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        value={username}
        numberOfLines={1}
        maxLength={40}
        placeholder="Username"
        autoComplete="username"
        style={styles.TextInput}
        onChangeText={(name) => setUsername(name)}
      />
      <TextInput
        value={password}
        numberOfLines={1}
        maxLength={40}
        secureTextEntry={securePassword}
        autoCapitalize="none"
        placeholder="Password"
        style={styles.TextInput}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        value={confirmPassword}
        numberOfLines={1}
        maxLength={40}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          try {
            signup(username, email, password, confirmPassword),
              clearCredentials();
          } catch (error) {
            Alert.alert(
              "Error",
              "Something went wrong somewhere. Please try again."
            );
          } finally {
            clearCredentials();
          }
        }}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SIGNUPMAIN;

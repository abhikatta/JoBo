import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import State from "../appwrite/registration";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styles } from "./styles";
const Signup = ({ navigation }) => {
  const { signup, state } = State();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handleSignup = async () => {
    try {
      await signup(email, password, username);
      console.log("Signup successful!");
      console.log(state.account);

      navigation.goBack();
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        autoComplete="email"
        numberOfLines={1}
        maxLength={40}
        placeholder="Email"
        style={styles.TextInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={username}
        numberOfLines={1}
        autoComplete="username"
        maxLength={40}
        placeholder="Username"
        style={styles.TextInput}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        value={password}
        autoComplete="password"
        numberOfLines={1}
        maxLength={40}
        secureTextEntry={securePassword}
        placeholder="Password"
        style={styles.TextInput}
        onChangeText={(text) => setPassword(text)}
      />
      <BouncyCheckbox
        style={styles.showPassword}
        onPress={() => setSecurePassword(!securePassword)}
        size={20}
        isChecked={false}
        textStyle={{
          textDecorationLine: "none",
          fontSize: 13,
        }}
        text="Show Password"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Signup;

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import State from "../appwrite/registration";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const Login = ({ navigation }) => {
  const { login } = State();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handleLogin = async () => {
    try {
      await login(email, password);
      console.log("Login successful!");
      const { state } = State();
      console.log(state.account);

      navigation.goBack();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        numberOfLines={1}
        maxLength={40}
        placeholder="Email"
        style={styles.TextInput}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
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
        isChecked={false}
        size={20}
        textStyle={{
          textDecorationLine: "none",
          fontSize: 13,
        }}
        text="Show Password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

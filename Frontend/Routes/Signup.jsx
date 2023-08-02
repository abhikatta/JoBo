import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { account } from "../appwrite/appwrite";
import { styles } from "../Screens/ProfileScreen";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const signup = async () => {
    await account.create("unique()", email, password, username);
    await account.createEmailSession(email, password);
    alert("Signed in as " + { username });
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
        autoComplete="name"
        maxLength={40}
        placeholder="Username"
        style={styles.TextInput}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        value={password}
        autoComplete="password"
        blurOnSubmit={true}
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

      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUp;

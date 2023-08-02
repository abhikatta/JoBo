import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { account } from "../appwrite/appwrite";
import { styles } from "../Screens/ProfileScreen";

const LogIn = ({ navigation }) => {
  const login = async () => {
    await account.createEmailSession(email, password);
    if (await account.getSession("current")) {
    }
    navigation.navigate("Tabs");
    // useEffect(() => {
    //   first;

    //   return () => {
    //     second;
    //   };
    // }, [third]);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handlePassword = () => {
    setSecurePassword(!securePassword);
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
        onPress={handlePassword}
        isChecked={false}
        size={20}
        textStyle={{
          textDecorationLine: "none",
          fontSize: 13,
        }}
        text="Show Password"
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LogIn;

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { account } from "../appwrite/appwrite";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const signup = async () => {
    await account.create("unique()", email, password, username);
    await account.createEmailSession(email, password);

    alert("Account Created");
  };
  const login = async () => {};

  const logout = async () => {
    await account.deleteSession("current");
  };

  // name: async () => {
  // 			const user = await Promise.resolve(sdk.account.get());
  // 			return user.name;
  // 		},
  // 		signup: async (email: string, password: string, name: string) => {
  // 			await sdk.account.create('unique()', email, password, name);
  // 			await sdk.account.createEmailSession(email, password);
  // 			const user = await sdk.account.get();
  // 			state.init(user);
  // 		},
  // 		login: async (email: string, password: string) => {
  // 			await sdk.account.createEmailSession(email, password);
  // 			const user = await sdk.account.get();
  // 			state.init(user);
  // 		},
  // 		logout: async () => {
  // 			await sdk.account.deleteSession('current');
  // 			return set({ account: null });
  // 		},
  // 		init: async (account: any) => {
  // 			return set({ account });
  // 		}
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
        value={username}
        numberOfLines={1}
        maxLength={40}
        placeholder="Username"
        style={styles.TextInput}
        onChangeText={(text) => setUsername(text)}
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
        onPress={() => setSecurePassword(!securePassword)}
        isChecked={false}
        textStyle={{
          textDecorationLine: "none",
        }}
        text="Show Password"
      />

      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

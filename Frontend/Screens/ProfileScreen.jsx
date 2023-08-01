import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { account } from "../appwrite/appwrite";

const Stack = createNativeStackNavigator();

export const ProfileScreen = ({ navigation, route }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name=" " component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};
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
  z1;
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
export const Login = ({ navigation }) => {
  return <Text>This is Login</Text>;
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
    marginVertical: "2%",
  },
  TextInput: {
    padding: 10,
    borderWidth: 1,
    marginHorizontal: "10%",
    borderRadius: 5,
    borderBottomColor: "#00aaff",
    borderTopColor: "gray",
    borderLeftColor: "gray",
    borderColor: "gray",
  },
  showPassword: {
    alignContent: "center",
    marginLeft: "10%",
  },
});

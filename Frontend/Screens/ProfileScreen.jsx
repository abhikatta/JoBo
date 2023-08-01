import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { account } from "../appwrite/appwrite";

const Stack = createNativeStackNavigator();

// const [disableSignp, SetEnableSignUp] = useState();
export const User = {
  disableSignIn: false,
  disableSignUp: false,
  disableSignOut: true,
};
export const ProfileScreen = ({ navigation, route }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* drop in all the screens here every child screen and parent screen should be here */}
        <Stack.Screen
          name="Register"
          options={{ headerTintColor: "purple" }}
          component={ProfileHomePage}
        />
        <Stack.Screen
          name="LogIn"
          options={{ headerTintColor: "purple" }}
          component={LogIn}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerTintColor: "purple" }}
          component={SignUp}
        />
        <Stack.Screen
          name="LogOut"
          options={{ headerTintColor: "teal" }}
          component={LogOut}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export const ProfileHomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        // disabled={User.disableSignIn}
        onPress={() => navigation.navigate("LogIn")}>
        <Text>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // disabled={User.disableSignUp}
        onPress={() => navigation.navigate("SignUp")}>
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        // disabled={User.disableSignOut}
        onPress={() => navigation.navigate("LogOut")}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export const LogIn = ({ navigation }) => {
  const login = async () => {
    await account.createEmailSession(email, password);
    alert("Loggin In");
    User.disableSignIn = true;
    User.disableSignUp = true;
    User.disableSignOut = false;
    navigation.goBack();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
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
        onPress={() => setSecurePassword(!securePassword)}
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

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const signup = async () => {
    await account.create("unique()", email, password, username);
    await account.createEmailSession(email, password);
    User.disableSignIn = true;
    User.disableSignOut = false;
    User.disableSignUp = true;
    navigation.goBack();
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
export const LogOut = ({ navigation }) => {
  const logout = async () => {
    await account.deleteSession("current");
    User.disableSignUp = false;
    User.disableSignOut = true;
    User.disableSignIn = false;
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <View>
        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProfileScreen;
export const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    flex: 1,
    marginTop: "50%",
    flexDirection: "column",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
    marginVertical: "2%",
  },
  TextInput: {
    padding: "3%",

    borderWidth: 1,
    marginHorizontal: "10%",
    marginVertical: "2%",
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

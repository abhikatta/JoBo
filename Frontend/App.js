import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { account } from "./appwrite/appwrite";
import { NavigationContainer } from "@react-navigation/native";
import { State } from "./State";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { styles } from "./styles";
import Tabs from "./navigation/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Password recovery:
// only redirects setting another one create mamnual updation of password
// const promise = account.createPasswordRecovery(
//   "email@example.com",
//   "https://example.com"
// );

const App = () => {
  const SplashTab = new createBottomTabNavigator();
  const [isLoggedIn, setIsLoggedin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handlePassword = () => {
    setSecurePassword(!securePassword);
  };

  const login = async () => {
    console.log("in login func 1");
    try {
      const loggedIn = await account.createEmailSession(email, password);
      const user = await account.get(loggedIn.$id);
      if (loggedIn) {
        State.currentUser.email = email;
        setUsername(loggedIn.clientName);
        console.log(isLoggedIn);
        setIsLoggedin(!isLoggedIn);
        State.currentUser.username = user.name;
      }
    } catch (error) {
      Alert.alert("Sign in error!", error.message);
    }
  };
  async function signup() {
    console.log("in sign func");

    await account.create("unique()", email, password, username);
    try {
      const loggedIn = await account.createEmailSession(email, password);
      const user = await account.get(loggedIn.$id);
      if (loggedIn) {
        State.currentUser.email = email;
        setUsername(loggedIn.clientName);
        console.log(isLoggedIn);
        State.loggedIn = true;
        setIsLoggedin(State.loggedIn);
        State.currentUser.username = user.name;
      }
    } catch (error) {
      Alert.alert("Sign in error!", error.message);
    }
  }
  const LOGIN = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            value={email}
            numberOfLines={1}
            maxLength={40}
            placeholder="Email"
            autoComplete="email"
            style={styles.TextInput}
            onChangeText={setEmail}
          />

          <TextInput
            value={password}
            numberOfLines={1}
            maxLength={40}
            secureTextEntry={securePassword}
            placeholder="Password"
            style={styles.TextInput}
            onChangeText={setPassword}
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
            <Text>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const SIGNUP = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            value={email}
            numberOfLines={1}
            maxLength={40}
            placeholder="Email"
            autoComplete="email"
            style={styles.TextInput}
            onChangeText={setEmail}
          />
          <TextInput
            value={username}
            numberOfLines={1}
            maxLength={40}
            placeholder="Username"
            autoComplete="username"
            style={styles.TextInput}
            onChangeText={setUsername}
          />

          <TextInput
            value={password}
            numberOfLines={1}
            maxLength={40}
            secureTextEntry={securePassword}
            placeholder="Password"
            autoComplete="password"
            style={styles.TextInput}
            onChangeText={setPassword}
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

          <TouchableOpacity style={styles.button} onPress={signup}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  return isLoggedIn ? (
    <Tabs />
  ) : (
    <NavigationContainer independent={true}>
      <SplashTab.Navigator initialRouteName="LOGIN" backBehavior="firstRoute">
        <SplashTab.Screen name="LOGIN" children={LOGIN}></SplashTab.Screen>
        <SplashTab.Screen name="SIGNUP" children={SIGNUP}></SplashTab.Screen>
      </SplashTab.Navigator>
    </NavigationContainer>
  );
};

export default App;

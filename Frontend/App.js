import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { account } from "./appwrite/appwrite";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Tabs from "./navigation/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { State } from "./State";
import { styles } from "./styles";

// Password recovery:
// only redirects setting another one create mamnual updation of password
// const promise = account.createPasswordRecovery(
//   "email@example.com",
//   "https://example.com"
// );

const App = ({ navigation }) => {
  const SplashTab = createBottomTabNavigator();
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
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 22,
                marginHorizontal: "10%",
                bottom: "5%",
                justifyContent: "center",
                alignContent: "center",
              }}>
              Hi there, enter your credentials to get started!
            </Text>
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
              fillColor="#00aaff"
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
      </ImageBackground>
    );
  };
  const SIGNUP = () => {
    return (
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <View style={styles.container}>
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
              OwO
            </Text>
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
              fillColor="#00aaff"
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
      </ImageBackground>
    );
  };
  // return isLoggedIn ? (
  return <Tabs />;
  // ) : (
  // return (
  //   <NavigationContainer independent={true}>
  //     <SplashTab.Navigator
  //       backBehavior="history"
  //       screenOptions={{
  //         tabBarStyle: styles.navBar,
  //         tabBarHideOnKeyboard: true,
  //         tabBarIconStyle: {
  //           top: "10%",
  //           padding: "10%",
  //           marginBottom: "10%",
  //           marginTop: "10%",
  //         },
  //         tabBarLabelStyle: {
  //           bottom: "10%",
  //         },
  //         tabBarActiveTintColor: "maroon",
  //       }}>
  //       <SplashTab.Screen
  //         name="LOGIN"
  //         children={LOGIN}
  //         option={{
  //           tabBarIcon: ({ focused }) => (
  //             <View style={styles.navIconView}>
  //               <Image
  //                 resizeMode="contain"
  //                 style={{
  //                   width: 25,
  //                   height: 25,
  //                   tintColor: focused ? "maroon" : "black",
  //                 }}
  //                 source={require("./assets/icons/login.png")}
  //               />
  //             </View>
  //           ),
  //         }}
  //       />
  //       <SplashTab.Screen
  //         name="SIGNUP"
  //         children={SIGNUP}
  //         option={{
  //           tabBarIcon: ({ focused }) => (
  //             <View style={{ justifyContent: "center", alignItems: "center" }}>
  //               <Image
  //                 resizeMode="contain"
  //                 style={{
  //                   width: 25,
  //                   height: 25,
  //                   tintColor: focused ? "maroon" : "black",
  //                 }}
  //                 source={require("./assets/icons/signup.png")}
  //               />
  //             </View>
  //           ),
  //         }}
  //       />
  //     </SplashTab.Navigator>
  //   </NavigationContainer>
  // );
};
export default App;

import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Tabs from "./navigation/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "./styles";

// -------------IMPORTANT DO NOT DELETE THIS---------------

// need to use this: not default firebase package:
// import { auth, database } from "react-native-firebase";

// -------------IMPORTANT DO NOT DELETE THIS---------------

// import LOGIN from "./Authentication/Login";
// import SIGNUP from "./Authentication/Signup";
// Password recovery:
// only redirects setting another one create mamnual updation of password
// const promise = account.createPasswordRecovery(
//   "email@example.com",
//   "https://example.com"
// );

const App = ({ navigation }) => {
  const SplashTab = new createBottomTabNavigator();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user);
      } else {
        setUserID(null);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      setUserID(response.user);
    } catch (error) {
      alert(error);
    }
  };

  async function loginInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      // Handle the response here
      import auth from "react";
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      // Handle the error here
      console.error(error.message);
      // You might want to set an error state here to show an error message to the user
    }
  }

  const SIGNUP = () => {
    console.log("Started again in signup");
    const handlePassword = () => {
      setSecurePassword((prevSecurePassword) => !prevSecurePassword);
    };
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
                width: 100,
                fontSize: 13,
              }}
              text="Show Password"
            />
            <TouchableOpacity style={styles.button} onPress={signup}>
              <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      alert(error);
    }
  };
  const LOGIN = () => {
    console.log("Started again in login");
    const handlePassword = () => {
      setSecurePassword((prevSecurePassword) => !prevSecurePassword);
    };
    return (
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 50,
                marginTop: "10%",
                color: "#0088ff",
                marginLeft: "10%",
              }}>
              J
              <Text
                style={{
                  fontSize: 50,
                  marginTop: "10%",
                  color: "#aa88ff",
                  marginLeft: "10%",
                }}>
                o
              </Text>
              <Text
                style={{
                  fontSize: 50,
                  marginTop: "10%",
                  color: "#0088dd",
                  marginLeft: "10%",
                }}>
                B
              </Text>
              <Text
                style={{
                  fontSize: 50,
                  marginTop: "10%",
                  color: "#00aaff",
                  marginLeft: "10%",
                }}>
                o
              </Text>
            </Text>
          </View>
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
              onChangeText={setEmail}
              autoComplete="email"
              style={styles.TextInput}
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
                width: 100,
              }}
              text="Show Password"
            />
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={loginInWithGoogle}>
              <Text style={styles.text}>Log In With Google</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
  // if no userID is found go to login/signup else go to tabs
  return userID ? (
    <Tabs />
  ) : (
    <NavigationContainer>
      <SplashTab.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.navBar,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            marginBottom: "5%",
          },
          tabBarActiveTintColor: "maroon",
        }}>
        <SplashTab.Screen
          options={{
            tabBarLabelStyle: {
              width: 45,
              bottom: "10%",
            },
            tabBarIcon: ({ focused }) => (
              <View style={styles.navIconView}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "maroon" : "black",
                  }}
                  source={require("./assets/icons/login.png")}
                />
              </View>
            ),
          }}
          name="LOGIN"
          children={LOGIN}
        />
        <SplashTab.Screen
          options={{
            tabBarLabelStyle: {
              width: 45,
              bottom: "10%",
            },
            tabBarIcon: ({ focused }) => (
              <View style={styles.navIconView}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "maroon" : "black",
                  }}
                  source={require("./assets/icons/signup.png")}
                />
              </View>
            ),
          }}
          name="SIGNUP"
          children={SIGNUP}
        />
      </SplashTab.Navigator>
    </NavigationContainer>
  );
};
export default App;

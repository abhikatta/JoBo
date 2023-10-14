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
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Tabs from "./navigation/tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { styles } from "./styles";
import LOGINMAIN from "./Authentication/LoginScreen";
import SIGNUPMAIN from "./Authentication/SignupScreen";

const App = () => {
  const SplashTab = new createBottomTabNavigator();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [securePassword, setSecurePassword] = useState(true);
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

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      setUserID(response.user);
      // clearCredentials();
    } catch (error) {
      alert(error);
      // clearCredentials();
    }
  };

  const signup = async (username, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((auth.currentUser.displayName = username));
      console.log(response);
      setUserID(response.user);
      // clearCredentials();
    } catch (error) {
      alert(error);
      // clearCredentials();
    }
  };
  async function loginAnonymously() {
    try {
      const response = await signInAnonymously(auth);
      // Handle the response here
      console.log(response.user);
      setUserID(response.user);
      // clearCredentials();
    } catch (error) {
      // Handle the error here
      console.error(error.message);
      // clearCredentials();

      // You might want to set an error state here to show an error message to the user
    }
  }
  async function loginInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      // Handle the response here
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

    return (
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <SIGNUPMAIN signup={signup} />
        </ScrollView>
      </ImageBackground>
    );
  };

  const LOGIN = () => {
    console.log("Started again in login");
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
          <LOGINMAIN login={login} loginAnonymously={loginAnonymously} />
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

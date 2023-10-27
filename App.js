import { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  updateProfile,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./Firebase/firebase";

import Tabs from "./navigation/tabs";
import LOGINMAIN from "./Authentication/LoginScreen";
import SIGNUPMAIN from "./Authentication/SignupScreen";
import { styles } from "./styles";

const TitleComponent = () => {
  return (
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
            color: "#aa88ff",
          }}>
          o
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: "#0088dd",
          }}>
          B
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: "#00aaff",
          }}>
          o
        </Text>
      </Text>
    </View>
  );
};

const App = () => {
  const SplashTab = new createBottomTabNavigator();
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserID(user);
        console.log(user);
      } else {
        setUserID(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      setUserID(response.user);
    } catch (e) {
      if (
        e.code === "auth/invalid-login-credentials" ||
        e.code === "auth/invalid-email" ||
        e.code === "auth/invalid-password"
      ) {
        Alert.alert(
          "Invalid Credentials!",
          "Email or Password incorrect. Please try again."
        );
      } else {
        Alert.alert(
          "Error",
          `Oh, no. Something went wrong somewhere. Make sure you are connected to the internet and please try again.\nError info:${e.message}`
        );
      }
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
      );
      updateProfile(auth.currentUser, { displayName: username });
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      Alert.alert(
        "Error.",
        "Something went wrong. Make sure you fill in all required values and are connected to the internet."
      );
      alert(error);
    }
  };

  async function loginAnonymously() {
    try {
      const response = await signInAnonymously(auth);
      // Handle the response here
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      // Handle the error here
      console.error(error.message);
      Alert.alert("Error.", "Something went wrong. Please try again.");
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
    return (
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <TitleComponent />

          <SIGNUPMAIN signup={signup} />
        </ScrollView>
      </ImageBackground>
    );
  };

  const LOGIN = () => {
    return (
      <ImageBackground
        source={require("./assets/backgrounds/splashbackground.png")}
        style={{ flex: 1 }}
        resizeMode="cover">
        <ScrollView>
          <TitleComponent />
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

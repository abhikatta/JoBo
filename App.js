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

import { auth, userPreferencesCollection } from "./Firebase/firebase";

import Tabs from "./navigation/tabs";
import LOGINMAIN from "./Authentication/LoginScreen";
import SIGNUPMAIN from "./Authentication/SignupScreen";
import { styles } from "./styles";
import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
      createUserPref();
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
      } else if (e.code === "auth/network-request-failed") {
        Alert.alert(
          "No Internet Connection!",
          "Please make sure you are connected to the internet and try again."
        );
      } else {
        Alert.alert(
          "Error!",
          `Oh no, something went wrong somewhere. Please make sure you are connected to
          the internet and your credentials are correct and try again after some time.`
        );
      }
    }
  };

  // create a pref collection for new user:
  const createUserPref = async () => {
    if (!auth.currentUser.isAnonymous) {
      try {
        await setDoc(doc(userPreferencesCollection, auth.currentUser.uid), {
          theme: "light",
        });
      } catch (error) {
        console.log(error.code, error.message);
        Alert.alert(
          "Error",
          "Something went wrong while trying to set user preferences."
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
      userID && createUserPref();

      // handleSetPref();
    } catch (error) {
      if (error.code === "auth/email-already-exists") {
        Alert.alert(
          "Error creating account!",
          "This email is already in use, please use another email id."
        );
      } else {
        Alert.alert(
          "Error!",
          "Something went wrong. Please Make sure you fill in all required values and are connected to the internet."
        );
        alert(error);
      }
    }
  };

  async function loginAnonymously() {
    try {
      const response = await signInAnonymously(auth);
      console.log(response.user);
      setUserID(response.user);
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error.", "Something went wrong. Please try again.");
    }
  }

  // TODO:

  // async function loginInWithGoogle() {
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const response = await signInWithPopup(auth, provider);
  //     console.log(response.user);
  //     setUserID(response.user);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

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

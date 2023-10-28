// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// This is only of the developement server, prod server will be deployed later
const firebaseConfig = {
  apiKey: "AIzaSyBKcrWGV2Obl2v8ryHcCFEhcjuG22PNM_s",
  authDomain: "jobo-57289.firebaseapp.com",
  projectId: "jobo-57289",
  storageBucket: "jobo-57289.appspot.com",
  messagingSenderId: "1023700870163",
  appId: "1:1023700870163:web:a3afffee40772914520be6",
  measurementId: "G-44NQH04GTM",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const journalsCollection = collection(db, "journals");
export const userPreferencesCollection = collection(db, "userprefs");

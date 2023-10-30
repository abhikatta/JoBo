// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS } from "../Keys";
// This is only of the developement server, prod server will be deployed later
const firebaseConfig = {
  apiKey: KEYS.firebaseConfig.apiKey,
  authDomain: KEYS.firebaseConfig.authDomain,
  projectId: KEYS.firebaseConfig.projectId,
  storageBucket: KEYS.firebaseConfig.storageBucket,
  messagingSenderId: KEYS.firebaseConfig.messagingSenderId,
  appId: KEYS.firebaseConfig.appId,
  measurementId: KEYS.firebaseConfig.measurementId,
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// if (app) {
//   KEYS.CRYPTOKEY = auth.currentUser.uid;
// }
export const journalsCollection = collection(db, "journals");
export const userPreferencesCollection = collection(db, "userprefs");

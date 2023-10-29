import { useState } from "react";
import { Linking, View, Text, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import RESETPASSWORD from "../Options/ResetPassword";
import RESETUSERNAME from "../Options/ResetUsername";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import { expo } from "../app.json";
// TODO:
const SettingScreen = () => {
  const [resetCredential, SetResetCredential] = useState("");

  // set theme :
  const handleTheme = async () => {
    if (!auth.currentUser.isAnonymous) {
      try {
        const docRef = doc(db, "userprefs", auth.currentUser.uid);
        const theme = await getDoc(docRef);
        if (theme.exists()) {
          console.log(theme.data());
        } else {
          console.log("error loggin theme");
        }
      } catch (error) {
        console.log("error loggin theme:" + error);
      }
    }
  };

  if (resetCredential === "username") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <RESETUSERNAME />
      </View>
    );
  } else if (resetCredential === "password") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <RESETPASSWORD />
      </View>
    );
  } else {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}>
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              minWidth: "96%",
              marginLeft: "2%",
              marginVertical: 10,
              borderRadius: 10,
              alignItems: "flex-start",
            }}>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 25,
              }}>
              General
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                // testPrefLog();
                handleTheme();
                Alert.alert(
                  "Upcoming feature!",
                  "Feature will be added soon. Stay tuned."
                );
              }}>
              <Text style={[styles.text, { color: "black" }]}>
                Theme: Light
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsButton]}
              onPress={() =>
                Linking.openURL(
                  "https://firebase.google.com/terms/data-processing-terms#1.-introduction"
                )
              }>
              <Text style={[styles.text, { color: "black" }]}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsButton]}
              onPress={() => {
                Linking.openURL(
                  "https://github.com/abhikatta/jobo/tree/migrate_to_firebase"
                );
              }}>
              <Text style={[styles.text, { color: "black" }]}>Help</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: "black",
              borderWidth: 1,
              minWidth: "96%",
              marginLeft: "2%",
              borderRadius: 10,
              alignItems: "flex-start",
            }}>
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 25,
              }}>
              Account Settings:
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => SetResetCredential("username")}>
              <Text style={[styles.text, { color: "black" }]}>
                Change Username
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsButton]}
              onPress={() => SetResetCredential("password")}>
              <Text style={[styles.text, { color: "black" }]}>
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://github.com/abhikatta/jobo/tree/migrate_to_firebase"
            )
          }
          style={{
            marginHorizontal: "20%",
            padding: "3%",
            alignItems: "center",
            marginVertical: "2%",
            bottom: -10,
            textAlign: "center",
          }}>
          <Text style={{ textDecorationLine: "underline" }}>Github</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginBottom: 100,
            textAlign: "center",
          }}>
          {expo.name} v{expo.version}
        </Text>
      </>
    );
  }
};

export default SettingScreen;

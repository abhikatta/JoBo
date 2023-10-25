import { useState } from "react";
import {
  Linking,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "../styles";
import { updatePassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RESETPASSWORD from "../ResetOptions/ResetPassword";
import RESETUSERNAME from "../ResetOptions/ResetUsername";
import RESETEMAIL from "../ResetOptions/ResetEmail";

// TODO:
const SettingScreen = () => {
  const [resetCredential, SetResetCredential] = useState("");

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
  } else if (resetCredential === "email") {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignSelf: "center",
          alignContent: "center",
          justifyContent: "center",
        }}>
        <RESETEMAIL />
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
              onPress={() =>
                Alert.alert(
                  "Upcoming feature!",
                  "Feature will be added soon. Stay tuned."
                )
              }>
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
                Reset Username
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.settingsButton]}
              onPress={() => SetResetCredential("email")}>
              <Text style={[styles.text, { color: "black" }]}>
                Change Email
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
          JoBo v1.9.7
        </Text>
      </>
    );
  }
};

export default SettingScreen;

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

// TODO:
const SettingScreen = () => {
  const [resetPassword, SetResetPassword] = useState(false);

  const RESETPASSWORD = () => {
    const [newPassword, SetNewPassword] = useState("");
    const [confirmNewPassword, SetConfirmNewPassword] = useState("");
    const [securePassword, setSecurePassword] = useState(true);

    const handlePassword = () => {
      setSecurePassword((prevSecurePassword) => !prevSecurePassword);
    };
    const clearCredentials = () => {
      SetNewPassword("");
      SetConfirmNewPassword("");
    };
    const handleResetPassword = async () => {
      if (newPassword === confirmNewPassword) {
        try {
          await updatePassword(auth.currentUser, newPassword);
        } catch (error) {
          Alert.alert(
            "Error!",
            "Something went wrong while trying to reset password. Please check your internet connection and try again."
          );
        }
      } else {
        Alert.alert("Passwords must match");
      }
    };
    return (
      <View style={styles.container}>
        <TextInput
          numberOfLines={1}
          maxLength={40}
          secureTextEntry={securePassword}
          style={styles.TextInput}
          value={newPassword}
          placeholder="Reset Password"
          onChangeText={(e) => SetNewPassword(e)}
        />
        <TextInput
          numberOfLines={1}
          maxLength={40}
          secureTextEntry={securePassword}
          style={styles.TextInput}
          value={confirmNewPassword}
          placeholder="Confirm New Password"
          onChangeText={(e) => SetConfirmNewPassword(e)}
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
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            handleResetPassword();
            clearCredentials();
          }}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return !resetPassword ? (
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
            style={{ paddingHorizontal: 10, paddingVertical: 5, fontSize: 25 }}>
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
            <Text style={[styles.text, { color: "black" }]}>Theme: Light</Text>
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
            style={{ paddingHorizontal: 10, paddingVertical: 5, fontSize: 25 }}>
            Account Settings:
          </Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => SetResetPassword(true)}>
            <Text style={[styles.text, { color: "black" }]}>
              Reset Username
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingsButton]}
            onPress={() => SetResetPassword(true)}>
            <Text style={[styles.text, { color: "black" }]}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingsButton]}
            onPress={() => SetResetPassword(true)}>
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
        JoBo v1.9.3
      </Text>
    </>
  ) : (
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
};

export default SettingScreen;

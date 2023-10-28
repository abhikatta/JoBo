import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const LOGINMAIN = ({ login, loginAnonymously }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const [ResetEmailPrompt, setResetEmailPrompt] = useState(false);

  const handleShowPassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };

  const clearCredentials = () => {
    setEmail("");
    setPassword("");
    setPasswordResetEmail("");
  };
  useEffect(() => {
    console.log(securePassword);
    setSecurePassword((prev) => !prev);
  }, [ResetEmailPrompt]);
  const emailPrompt = () => {
    setResetEmailPrompt((prevSend) => !prevSend);
  };

  const resetPasswordEmail = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Sent!", "A link to reset your password has been sent.", [
        {
          text: "OK",
          onPress: () => {
            emailPrompt();
            clearCredentials();
          },
        },
      ]);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert(
          "Error",
          "Email does not exist. Please re-enter the correct email id."
        );
      }
    }
  };
  return !ResetEmailPrompt ? (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          textAlign: "center",
          marginHorizontal: "2%",
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
        onChangeText={(email) => setEmail(email)}
        autoComplete="email"
        style={styles.TextInput}
      />
      <TextInput
        value={password}
        numberOfLines={1}
        maxLength={40}
        secureTextEntry={securePassword}
        placeholder="Password"
        autoComplete="password"
        style={styles.TextInput}
        onChangeText={(password) => setPassword(password)}
      />

      <BouncyCheckbox
        style={styles.showPassword}
        onPress={handleShowPassword}
        isChecked={securePassword}
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
        style={styles.button}
        onPress={() => {
          login(email, password);
          clearCredentials();
        }}>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loginAnonymously();
          clearCredentials();
        }}>
        <Text style={styles.text}>Log In Anonymously</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          emailPrompt();
        }}>
        <Text style={{ color: "black", textAlign: "center", marginTop: "5%" }}>
          Forgot password? Click here to reset your password.
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>
        Enter email to recieve the password reset link.
      </Text>
      <TextInput
        value={passwordResetEmail}
        numberOfLines={1}
        maxLength={40}
        placeholder="Enter email"
        onChangeText={(email) => setPasswordResetEmail(email)}
        style={[
          styles.TextInput,
          {
            width: "80%",
            color: "black",
            alignSelf: "center",
            textAlign: "left",
          },
        ]}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (passwordResetEmail.length > 0) {
            resetPasswordEmail(passwordResetEmail);
          } else {
            Alert.alert("Error!", "Please enter a valid email.");
          }
        }}>
        <Text style={styles.text}>Reset Passsword</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          emailPrompt();
        }}>
        <Text style={styles.text}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LOGINMAIN;

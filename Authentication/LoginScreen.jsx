import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const LOGINMAIN = ({ login, loginAnonymously }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const handlePassword = () => {
    setSecurePassword((prevSecurePassword) => !prevSecurePassword);
  };
  const clearCredentials = () => {
    setEmail("");
    setPassword("");
  };
  return (
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
        style={styles.TextInput}
        onChangeText={(password) => setPassword(password)}
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
        style={styles.button}
        onPress={() => {
          login(email, password), clearCredentials();
        }}>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          loginAnonymously(), clearCredentials();
        }}>
        <Text style={styles.text}>Log In Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LOGINMAIN;

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { account } from "../appwrite/appwrite";
import { styles } from "./ProfileScreen";
import Tabs from "../navigation/tabs";

const Stack = createNativeStackNavigator();
const SplashScreen = ({ navigation }) => {
  const LogIn = ({ navigation }) => {
    const login = async () => {
      let session = await account.createEmailSession(email, password);
      if (session) {
        navigation.navigate("Tabs");
      }
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securePassword, setSecurePassword] = useState(true);
    const handlePassword = () => {
      setSecurePassword(!securePassword);
    };
    return (
      <View style={styles.container}>
        <TextInput
          value={email}
          numberOfLines={1}
          maxLength={40}
          placeholder="Email"
          style={styles.TextInput}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          value={password}
          blurOnSubmit={true}
          numberOfLines={1}
          maxLength={40}
          secureTextEntry={securePassword}
          placeholder="Password"
          style={styles.TextInput}
          onChangeText={(text) => setPassword(text)}
        />
        <BouncyCheckbox
          style={styles.showPassword}
          onPress={handlePassword}
          isChecked={false}
          size={20}
          textStyle={{
            textDecorationLine: "none",
            fontSize: 13,
          }}
          text="Show Password"
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [securePassword, setSecurePassword] = useState(true);
    const signup = async () => {
      await account.create("unique()", email, password, username);
      let session = await account.createEmailSession(email, password);
      if (session) {
        alert("Signed in!");
        navigation.navigate("Tabs");
      }
    };

    return (
      <View style={styles.container}>
        <TextInput
          value={email}
          autoComplete="email"
          numberOfLines={1}
          maxLength={40}
          placeholder="Email"
          style={styles.TextInput}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={username}
          numberOfLines={1}
          autoComplete="name"
          maxLength={40}
          placeholder="Username"
          style={styles.TextInput}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          value={password}
          autoComplete="password"
          blurOnSubmit={true}
          numberOfLines={1}
          maxLength={40}
          secureTextEntry={securePassword}
          placeholder="Password"
          style={styles.TextInput}
          onChangeText={(text) => setPassword(text)}
        />
        <BouncyCheckbox
          style={styles.showPassword}
          onPress={() => setSecurePassword(!securePassword)}
          size={20}
          isChecked={false}
          textStyle={{
            textDecorationLine: "none",
            fontSize: 13,
          }}
          text="Show Password"
        />

        <TouchableOpacity style={styles.button} onPress={signup}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="SplashScreenPage">
        <Stack.Screen
          name="SplashScreenPage"
          options={{ headerShown: false }}
          component={SplashScreenPage}
        />
        <Stack.Screen
          name="LogIn"
          options={{ headerShown: false }}
          component={LogIn}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SplashScreenPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LogIn")}>
        <Text>LogIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

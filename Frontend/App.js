import { View, Text, StyleSheet, Button } from "react-native";
import NavBar from "./src/HomePage/NavBar";
import Home from "./src/HomePage/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "./src/ProfilePage/ProfilePage";
import Settings from "./src/SettingsPage/SettingPage";

// import JustifyContentBasics from "./src/test";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    // <View>
    //   <Home />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "JoBo" }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

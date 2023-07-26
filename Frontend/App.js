import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import ProfilePage from "./Screens/ProfilePage";
import BooksPage from "./Screens/BooksPage";
import FavoritesPage from "./Screens/FavoritesPage";
import SettingPage from "./Screens/SettingPage";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "JoBo",
            headerTintColor: "#11ee1a",
            navigationBarColor: "purple",
          }}
        />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Books" component={BooksPage} />
        <Stack.Screen name="Favorites" component={FavoritesPage} />
        <Stack.Screen name="Settings" component={SettingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

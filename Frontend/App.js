import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./Screens/SplashScreen";

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <SplashScreen />
    </NavigationContainer>
  );
};

export default App;

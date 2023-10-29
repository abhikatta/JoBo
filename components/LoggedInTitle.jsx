import { Text, View } from "react-native";
import { styles } from "../styles";

const LOGGEDINTITLECOMPONENT = () => {
  return (
    <>
      <Text
        style={[
          styles.homeText,
          {
            fontSize: 25,
            marginLeft: 5,
          },
        ]}>
        <Text
          style={[
            styles.homeText,
            {
              color: "black",
              fontSize: 25,
              marginLeft: 5,
            },
          ]}>
          Your{" "}
        </Text>
        <Text
          style={[
            styles.homeText,
            {
              fontWeight: "900",

              fontSize: 25,

              marginLeft: 5,
            },
          ]}>
          Jo
        </Text>
        <Text
          style={[
            styles.homeText,
            { color: "black", fontSize: 25, marginLeft: 5 },
          ]}>
          urnalized{" "}
        </Text>
        {/* <Text
          style={[
            styles.homeText,
            {
              fontSize: 25,
              marginLeft: 5,
            },
          ]}></Text> */}
        <Text
          style={[
            styles.homeText,
            {
              fontSize: 25,
              fontWeight: "900",
              marginLeft: 5,
            },
          ]}>
          Bo
        </Text>
        <Text
          style={[
            styles.homeText,
            { color: "black", fontSize: 25, marginLeft: 5 },
          ]}>
          oks
        </Text>
      </Text>
    </>
  );
};
export default LOGGEDINTITLECOMPONENT;

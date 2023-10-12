// import {
//   View,
//   TouchableOpacity,
//   ImageBackground,
//   Text,
//   TextInput,
//   ScrollView,
// } from "react-native";

// import { createUserWithEmailAndPassword } from "firebase/auth";

// import BouncyCheckbox from "react-native-bouncy-checkbox";

// import { auth } from "../Firebase/firebase";
// import { styles } from "../styles";

// const SIGNUP = () => {
//   const signup = async (email, password) => {
//     try {
//       const response = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(response);
//       setUserID(response.user);
//     } catch (error) {
//       alert(error);
//     }
//   };
//   console.log("Started again in signup");

//   const handlePassword = () => {
//     setSecurePassword((prevSecurePassword) => !prevSecurePassword);
//   };
//   return (
//     <ImageBackground
//       source={require("../assets/backgrounds/splashbackground.png")}
//       style={{ flex: 1 }}
//       resizeMode="cover">
//       <ScrollView>
//         <View style={styles.container}>
//           <Text
//             style={{
//               fontSize: 22,
//               marginHorizontal: "10%",
//               bottom: "5%",
//               justifyContent: "center",
//               alignContent: "center",
//             }}>
//             Don't have an account? {"\n"}
//             create one.{"\n"}
//           </Text>
//           <TextInput
//             value={email}
//             numberOfLines={1}
//             maxLength={40}
//             placeholder="Email"
//             autoComplete="email"
//             style={styles.TextInput}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             value={username}
//             numberOfLines={1}
//             maxLength={40}
//             placeholder="Username"
//             autoComplete="username"
//             style={styles.TextInput}
//             onChangeText={setUsername}
//           />

//           <TextInput
//             value={password}
//             numberOfLines={1}
//             maxLength={40}
//             secureTextEntry={securePassword}
//             placeholder="Password"
//             autoComplete="password"
//             style={styles.TextInput}
//             onChangeText={setPassword}
//           />
//           <BouncyCheckbox
//             style={styles.showPassword}
//             onPress={handlePassword}
//             isChecked={false}
//             fillColor="#00aaff"
//             size={20}
//             textStyle={{
//               textDecorationLine: "none",
//               width: 100,
//               fontSize: 13,
//             }}
//             text="Show Password"
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={(email, password) => signup(email, password)}>
//             <Text style={styles.text}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };
// export default SIGNUP;

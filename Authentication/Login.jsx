// import {
//   View,
//   TouchableOpacity,
//   ImageBackground,
//   Text,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import BouncyCheckbox from "react-native-bouncy-checkbox";

// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../Firebase/firebase";

// import { styles } from "../styles";

// const LOGIN = () => {
//   console.log("Started again in login");

//   const handlePassword = () => {
//     setSecurePassword((prevSecurePassword) => !prevSecurePassword);
//   };

//   const login = async () => {
//     try {
//       const response = await signInWithEmailAndPassword(auth, email, password);
//       console.log(response.user);
//       setUserID(response.user);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/backgrounds/splashbackground.png")}
//       style={{ flex: 1 }}
//       resizeMode="cover">
//       <ScrollView>
//         <View>
//           <Text
//             style={{
//               fontSize: 50,
//               marginTop: "10%",
//               color: "#0088ff",
//               marginLeft: "10%",
//             }}>
//             J
//             <Text
//               style={{
//                 fontSize: 50,
//                 marginTop: "10%",
//                 color: "#aa88ff",
//                 marginLeft: "10%",
//               }}>
//               o
//             </Text>
//             <Text
//               style={{
//                 fontSize: 50,
//                 marginTop: "10%",
//                 color: "#0088dd",
//                 marginLeft: "10%",
//               }}>
//               B
//             </Text>
//             <Text
//               style={{
//                 fontSize: 50,
//                 marginTop: "10%",
//                 color: "#00aaff",
//                 marginLeft: "10%",
//               }}>
//               o
//             </Text>
//           </Text>
//         </View>
//         <View style={styles.container}>
//           <Text
//             style={{
//               fontSize: 22,
//               marginHorizontal: "10%",
//               bottom: "5%",
//               justifyContent: "center",
//               alignContent: "center",
//             }}>
//             Hi there, enter your credentials to get started!
//           </Text>
//           <TextInput
//             value={email}
//             numberOfLines={1}
//             maxLength={40}
//             placeholder="Email"
//             onEndEditing={(e) => setEmail(e.nativeEvent.text)}
//             autoComplete="email"
//             style={styles.TextInput}
//           />

//           <TextInput
//             value={password}
//             numberOfLines={1}
//             maxLength={40}
//             secureTextEntry={securePassword}
//             placeholder="Password"
//             style={styles.TextInput}
//             onChangeText={setPassword}
//           />
//           <BouncyCheckbox
//             style={styles.showPassword}
//             onPress={handlePassword}
//             isChecked={false}
//             size={20}
//             fillColor="#00aaff"
//             textStyle={{
//               textDecorationLine: "none",
//               fontSize: 13,
//               width: 100,
//             }}
//             text="Show Password"
//           />

//           <TouchableOpacity
//             style={styles.button}
//             onPress={(email, password) => login(email, password)}>
//             <Text style={styles.text}>Log In</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };
// export default LOGIN;

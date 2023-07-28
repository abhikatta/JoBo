// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   Image,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { Camera, CameraType } from "expo-camera";
// import { shareAsync } from "expo-sharing";
// import * as MediaLibrary from "expo-media-library";
// const CameraScreen = () => {
//   const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = useRef(null);
//   useEffect =
//     (() => {
//       async () => {
//         MediaLibrary.requestPermissionsAsync();
//         const cameraStatus = await Camera.requestCameraPermissionsAsync();
//         setHasCameraPermissions(cameraStatus.status === "granted");
//       };
//     },
//     []);

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={type}
//         flashMode={flash}
//         ref={cameraRef}>
//         <Text>Camera Test</Text>
//       </Camera>
//     </View>
//   );
// };
// export default CameraScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   camera: {
//     flex: 1,
//     borderRadius: 20,
//   },
// });

import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [toggleFlash, setToggleFlash] = useState(false);
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View>
        <Text>persmisinsg</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        flashMode={toggleFlash ? "torch" : "off"}
        type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setToggleFlash(() => !toggleFlash)}>
            <Text style={styles.text}>Flash</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    bottom: 40,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

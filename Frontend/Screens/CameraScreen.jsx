import { Camera, CameraType } from "expo-camera";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [toggleFlash, setToggleFlash] = useState(false);
  const ref = useRef(null);

  const takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    console.debug(photo);
    console.log(photo.uri);
  };

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
          }}>
          Loading...
        </Text>
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
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.front ? CameraType.back : CameraType.front
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ratio="16:9"
        ref={ref}
        style={styles.camera}
        flashMode={toggleFlash ? "torch" : "off"}
        type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Image
              resizeMode="contain"
              source={require("../assets/icons/flip_camera.png")}
              style={styles.button}
            />
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Image
              resizeMode="contain"
              source={require("../assets/icons/take_photo.png")}
              style={styles.button}
            />
            <Text style={styles.text}>JoBo </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setToggleFlash(() => !toggleFlash)}>
            <Image
              resizeMode="contain"
              source={require("../assets/icons/flash.png")}
              style={styles.button}
            />
            <Text style={styles.text}>Flash </Text>
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
    borderRadius: 10,

    marginTop: 650,
    marginHorizontal: 30,
    marginBottom: 50,
    flexDirection: "row",
    backgroundColor: "transparent",

    opacity: 0.6,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    tintColor: "white",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

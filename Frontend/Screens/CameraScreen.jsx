import { Camera, CameraType } from "expo-camera";
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
  const [cameraReady, setCameraReady] = useState(false);
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
        onCameraReady={() => setCameraReady(() => !cameraReady)}
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
          {
            <TouchableOpacity
              style={styles.button}
              onPress={cameraReady && takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          }
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
    marginHorizontal: 20,
    marginBottom: 40,
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

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export let JoBoText = {
  value: [],
};
function print(data) {
  console.log(data);
}
export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermissionResponse, cameraRequestPermission] =
    Camera.useCameraPermissions();
  const [mediaPermissionResponse, mediaRequestPermission] =
    MediaLibrary.usePermissions();

  const [toggleFlash, setToggleFlash] = useState(false);
  const ref = useRef(null);

  const takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    MediaLibrary.saveToLibraryAsync(photo.uri);
    JoBoText.value.push(photo.uri + "\n");
    JoBoText.updated = true;
    print("New photo.uri set ");
    print(JoBoText.value);
    print(JoBoText.updated);
    alert("Photo Saved to Camera Roll.");
  };

  if (!cameraPermissionResponse) {
    // Camera permissions are still loading
    return (
      <View>
        {/* cool css, so: */}
        <Text style={styles.permissonButton}>
          Loading Camera Permissions...
        </Text>
      </View>
    );
  }
  if (!mediaPermissionResponse) {
    // Camera permissions are still loading
    return (
      <View>
        {/* cool css, so: */}
        <Text style={styles.permissonButton}>Loading Media Permissions...</Text>
      </View>
    );
  }
  if (!cameraPermissionResponse.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.permissonButton}>
          <Text onPress={cameraRequestPermission} style={{ fontSize: 20 }}>
            Grant Camera Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (!mediaPermissionResponse.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.permissonButton}>
          <Text onPress={mediaRequestPermission} style={{ fontSize: 20 }}>
            Grant Media Permission
          </Text>
        </TouchableOpacity>
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
          <View style={styles.buttonBorder}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Image
                resizeMode="contain"
                source={require("../assets/icons/flip_camera.png")}
                style={styles.button}
              />
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBorder}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Image
                resizeMode="contain"
                source={require("../assets/icons/take_photo.png")}
                style={styles.button}
              />
              <Text style={styles.text}>JoBo </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBorder}>
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
  buttonBorder: {
    // borderRadius: 15,
    // borderColor: "#abaabd",
    // borderWidth: 2,
  },
  permissonButton: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 600,
    marginHorizontal: 30,
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  button: {
    flex: 1,
    tintColor: "lavender",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

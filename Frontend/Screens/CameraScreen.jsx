import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";
import { Button, Image } from "react-native";
import { styles } from "../styles";
import * as FileSystem from "expo-file-system";
import { Text, TouchableOpacity, View } from "react-native";
global.Buffer = require("buffer").Buffer;
export let JoBoText = {
  OCRTEXT: [],
};

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermissionResponse, cameraRequestPermission] =
    Camera.useCameraPermissions();
  const [mediaPermissionResponse, mediaRequestPermission] =
    MediaLibrary.usePermissions();

  const [toggleFlash, setToggleFlash] = useState(false);
  const ref = useRef(null);

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
      <View style={styles.cameraContainer}>
        <Button
          title="Grant Camera Permissions"
          onPress={cameraRequestPermission}
        />
      </View>
    );
  }
  if (!mediaPermissionResponse.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.cameraContainer}>
        <Button
          title="Grant Camera Permissions"
          onPress={mediaRequestPermission}
        />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.front ? CameraType.back : CameraType.front
    );
  }
  function toggleFlashType() {
    setToggleFlash(!toggleFlash);
  }
  const takePhoto = async () => {
    const { uri } = await ref.current.takePictureAsync();
    console.log(uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log(asset.uri);

    async function query(file) {
      const fileContentfake = await FileSystem.readAsStringAsync(file, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const response = await fetch(
        "https://proxy-hugging-api.vercel.app/api/image",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: fileContentfake.toString(),
        }
      );
      const result = await response.json();
      return result;
    }
    alert("Photo Saved to Camera Roll.");

    query(asset.uri)
      .then((response) => {
        response = JSON.stringify(response);
        // const generated_text = response["message"][0]["generated_text"];
        // console.log(generated_text);
        console.log(response);
        if (response !== null) {
          JoBoText.OCRTEXT.push(response);
        }
        if (response === null) {
        }
      })
      .catch((error) => {
        console.log("Hugging face erro: " + error);
      });

    // JoBoText.OCRTEXT.push(
    //   <Image style={{ width: 180, height: 400 }} source={{ uri: asset.uri }} />
    // );
  };
  return (
    <View style={styles.cameraContainer}>
      <Camera
        ratio="16:9"
        ref={ref}
        style={styles.camera}
        flashMode={toggleFlash ? "torch" : "off"}
        type={type}>
        <View style={styles.cameraButtonContainer}>
          <View>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={toggleCameraType}>
              <Image
                resizeMode="contain"
                source={require("../assets/icons/flip_camera.png")}
                style={styles.cameraButton}
              />
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <Image
                resizeMode="contain"
                source={require("../assets/icons/take_photo.png")}
                style={styles.cameraButton}
              />
              <Text style={styles.text}>JoBo</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={toggleFlashType}>
              <Image
                resizeMode="contain"
                source={require("../assets/icons/flash.png")}
                style={styles.cameraButton}
              />
              <Text style={styles.text}>Flash</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

import { useState, useRef } from "react";
import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";

global.Buffer = require("buffer").Buffer;
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import { addDoc, serverTimestamp } from "firebase/firestore";

import { styles } from "../styles";
import { auth, journalsCollection } from "../Firebase/firebase";

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
          title="Grant Media Permissions"
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

  async function pushToFirebase(text) {
    const newJournal = {
      entry_text: text,
      id: auth.currentUser.uid,
      liked: false,
      timestamp: serverTimestamp(),
    };
    try {
      await addDoc(journalsCollection, newJournal);
      console.log("Journal entry added to Firebase Firestore:", newJournal);
    } catch (error) {
      console.error("Error uploading journal entry to Firestore:", error);
      Alert.alert(
        "Error!",
        "Something went wrong. Check your internet connection and try again."
      );
    }
  }

  const takePhoto = async () => {
    const { uri } = await ref.current.takePictureAsync();
    console.log(uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log(asset.uri);

    async function query(file) {
      const URL = "https://proxy-hugging-api.vercel.app/api/image";
      // const URL = "http://10.74.20.123:5000/process_image";
      const fileContentfake = await FileSystem.readAsStringAsync(file, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: fileContentfake.toString(),
      });
      const result = await response.json();
      return result;
    }

    Alert.alert("Photo Saved.", "Photo has been saved to camera roll.");

    query(asset.uri)
      .then((response) => {
        if (response !== null) {
          console.log("Got response" + response);
          pushToFirebase(JSON.stringify(response.message[0].generated_text));
        } else {
          console.log("Error, null response. Try again.");
        }
      })
      .catch((error) => {
        console.log("Hugging face error: " + error);
        if (error instanceof TypeError) {
          Alert.alert(
            "Error!",
            "The model is probably re-loading, please try after some time."
          );
        }
      });
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

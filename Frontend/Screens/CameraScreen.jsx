import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef } from "react";
import { Image } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export let JoBoText = {
  imagePaths: [],
};

export default function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [cameraPermissionResponse, cameraRequestPermission] =
    Camera.useCameraPermissions();
  const [mediaPermissionResponse, mediaRequestPermission] =
    MediaLibrary.usePermissions();

  const [toggleFlash, setToggleFlash] = useState(false);
  const ref = useRef(null);

  const takePhoto = async () => {
    const assetAlbum = "JoBoCaptures";
    const { uri } = await ref.current.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);
    // let { folder } = "";
    // if (await MediaLibrary.getAlbumAsync(assetAlbum)) {
    //   folder = await MediaLibrary.getAlbumAsync(assetAlbum);
    // } else {
    //   folder = await MediaLibrary.createAlbumAsync(
    //     assetAlbum,
    //     asset.uri,
    //     false
    //   );
    // }
    // const { fromFolder } = MediaLibrary.getAlbumAsync(assetAlbum);
    // console.log(folder);
    // api test:
    // const query = async (filename) => {
    //   const data = MediaLibrary.readFileSync(filename);
    //   const response = await fetch(
    //     "https://api-inference.huggingface.co/models/microsoft/trocr-large-handwritten",
    //     {
    //       headers: {
    //         Authorization: "Bearer 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",
    //       },
    //       method: "POST",
    //       body: data,
    //     }
    //   );
    //   const result = await response.json();
    //   return result;
    // };
    // filename = MediaLibrary.createAssetAsync(photoURI);
    // query(filename).then((response) => {
    //   console.log(JSON.stringify(response));
    // });
    //

    alert("Photo Saved to Camera Roll.");

    JoBoText.imagePaths.push(
      <Image style={{ width: 90, height: 160 }} source={{ uri: asset.uri }} />
    );
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

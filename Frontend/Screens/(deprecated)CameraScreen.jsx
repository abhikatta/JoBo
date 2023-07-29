import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";

const NewJoBoScreen = ({ navigation }) => {
  let cameraRef = useRef();
  const [hasCameraPermisison, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  useEffect(() => {
    (async () => {
      const cameraPermisison = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermisison.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermisison === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermisison) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: true,
    };
    let newPhoto = await cameraRef.current.takePictureAsynv(options);
    setPhoto(newPhoto);
  };

  if (!photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    return (
      <View style={styles.AndroidSafeAreaView}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <TouchableOpacity title="Share" onPress={sharePic}></TouchableOpacity>
        {hasMediaLibraryPermission ? (
          <TouchableOpacity title="Save" onPress={savePhoto}></TouchableOpacity>
        ) : undefined}
        <TouchableOpacity title="Discard" onPress={sharePic}></TouchableOpacity>
      </View>
    );
  }
  return (
    <Camera ref={cameraRef} style={styles.container}>
      <View style={styles.TouchableOpacityContainer}>
        <TouchableOpacity onPress={takePic}>TakePic</TouchableOpacity>
      </View>
    </Camera>
  );
};

export default NewJoBoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  TouchableOpacityContainer: {
    tintColor: "maroon",
  },
  AndroidSafeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  preview: {
    alignSelf: "auto",
    flex: 1,
  },
});

// Another Version but also deprecated or not fully implemented:
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

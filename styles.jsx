import { Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  navBar: {
    borderRadius: 15,
    position: "absolute",
    bottom: Platform.OS === "ios" ? "-2%" : "1%",
    height: Platform.OS === "ios" ? "10%" : "7%",
    left: Platform.OS === "ios" ? "0%" : "5%",
    right: Platform.OS === "ios" ? "0%" : "5%",
    backgroundColor: "#fff",
    elevation: 15,
    shadowColor: "#00aaff",
  },
  navIconView: {
    justifyContent: "center",
    alignItems: "center",
  },
  noFavoritesImage: {
    width: 200,
    height: 200,
  },
  text: {
    textAlign: "center",
    width: "auto",
    color: "white",
  },
  container: {
    alignContent: "space-between",
    justifyContent: "center",
    paddingTop: "50%",
  },
  button: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
    marginVertical: "2%",
  },
  settingsButton: {
    marginHorizontal: "20%",
    padding: "3%",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: "2%",
  },
  TextInput: {
    padding: "3%",
    shadowColor: "#00aaff",
    elevation: 5,
    borderBottomWidth: 3,
    marginHorizontal: "10%",
    marginVertical: "2%",
    borderRadius: 5,
    color: "black",
    borderBottomColor: "#00aaff",
    borderTopColor: "#eeeeee",
    borderLeftColor: "#eeeeee",
    backgroundColor: "#fff",
    borderRightColor: "#eeeeee",
  },
  showPassword: {
    alignContent: "center",
    marginLeft: "10%",
  },

  // camera:
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  permissonButton: {
    backgroundColor: "#00aaff",
    marginHorizontal: "20%",
    padding: "3%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#00aaff",
    borderRadius: 10,
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    marginTop: 600,
    marginHorizontal: 30,
    marginBottom: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  cameraButton: {
    flex: 1,
    tintColor: "#204060",
    alignSelf: "center",
    alignItems: "center",
  },
  cameraText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  // booksScreen:
  homeMain: {
    marginTop: "10%",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: "5%",
    marginBottom: "15%",
  },
  noJoboCard: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 50,
    alignItems: "center",
    flex: 0.95,
    flexDirection: "column",
    justifyContent: "center",
  },
  homeCard: {
    backgroundColor: "#fff",
    borderColor: "#00aadd",
    borderWidth: 2,
    shadowColor: "#ccddee",
    elevation: 15,
    resizeMode: "contain",
    borderRadius: 20,
    marginVertical: 5,
  },
  JoBos: {
    alignItems: "center",
    height: "88%",
    flexDirection: "column",
    marginHorizontal: "2%",
  },
  cardOption: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    width: 30,
  },
  homeOptionBar: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal: "5%",
    flexDirection: "row",
  },
  homeText: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});

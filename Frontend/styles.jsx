import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  navBar: {
    borderRadius: 15,
    position: "absolute",
    bottom: "1%",
    height: "7%",
    left: "5%",
    right: "5%",
    backgroundColor: "#dddddd",
    elevation: 5,
    shadowColor: "maroon",
  },
  navIconView: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    flex: 1,
    marginTop: "50%",
    flexDirection: "column",
    paddingTop: 10,
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
  TextInput: {
    padding: "3%",
    shadowColor: "#00aaff",
    elevation: 5,

    borderBottomWidth: 3,
    marginHorizontal: "10%",
    marginVertical: "2%",
    borderRadius: 5,
    borderBottomColor: "#00aaff",
    borderTopColor: "#eeeeee",
    borderLeftColor: "#eeeeee",
    backgroundColor: "#dddddd",
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
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cameraButton: {
    flex: 1,
    tintColor: "lavender",
    alignSelf: "center",
    alignItems: "center",
  },
  cameraText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  // booksScreen:
  booksMain: {
    flex: 1,
    height: "100%",
    width: "100%",
  },

  booksColumn: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#559988",
  },
});

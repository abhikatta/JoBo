import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

    borderWidth: 1,
    marginHorizontal: "10%",
    marginVertical: "2%",
    borderRadius: 5,
    borderBottomColor: "#00aaff",
    borderTopColor: "gray",
    borderLeftColor: "gray",
    borderColor: "gray",
  },
  showPassword: {
    alignContent: "center",
    marginLeft: "10%",
  },
});

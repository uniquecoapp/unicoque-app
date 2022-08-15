import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

export default function App({ navigation }) {
  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/uniqueco-logo.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/bg-image-large.png")}
        style={styles.largeImage}
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigate("Login")}
        activeOpacity={0.4}
        underlayColor="#000"
      >
        <Text style={styles.text}>LOGIN</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigate("Register")}
        activeOpacity={0.4}
        underlayColor="#000"
      >
        <Text style={styles.text}>REGISTER</Text>
      </TouchableHighlight>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(254,136,9,0.8)",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logo: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
  largeImage: {
    marginTop: -50,
    width: "100%",
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    width:250,
    marginTop:20
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

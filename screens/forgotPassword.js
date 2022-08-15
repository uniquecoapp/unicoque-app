import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { sendPasswordResetEmail } from "firebase/auth";
import { passAuth } from "../config/firebase";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function App({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const inputRef = useRef(null);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  const resetPassword = () => {
    sendPasswordResetEmail(passAuth(), email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("Send Email Successfully")

      })
      .catch((error) => {
        // ..
        alert("Something went wrong!")
      });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        Keyboard.dismiss();
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.align}
      scrollEnabled={false}
      keyboardShouldPersistTaps={"never"}
    >
      <Image
        source={require("../assets/uniqueco-logo.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/bg-image-large.png")}
        style={styles.largeImage}
      />
      <View
        style={styles.loginFormContainer}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.largeText}>Type of email of Account</Text>
        <TextInput
          onPress={() => setKeyboardVisible(true)}
          ref={inputRef}
          style={styles.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
          // onSubmitEditing={() => inputRef}
          placeholder={"Email"}
        />
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => resetPassword()}
          activeOpacity={0.4}
          underlayColor="#e7decc"
        >
          <Text style={styles.loginBtnText}>SEND EMAIL</Text>
        </TouchableHighlight>

        <Text style={styles.forgotPassword} onPress={() => navigate("Login")}>
          Go Back
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  align: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    marginTop: 10,
    width: "50%",
    height: 100,
    resizeMode: "contain",
  },
  largeImage: {
    marginTop: -130,
    width: "80%",
    resizeMode: "contain",
  },
  button: {
    paddingVertical: 10,
    width: 100,
  },
  buttonActive: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FF9829",
    color: "black",
  },
  button: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#FF9829",
    borderWidth: 1,
  },
  activetext: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FF9829",
  },
  loginFormContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  largeText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  loginBtn: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
  },
  loginBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  forgotPassword: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

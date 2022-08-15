import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Keyboard,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { passAuth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function App({ navigation }) {
  // States
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [activeLogin, setActiveLogin] = useState("student");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnStatus, setBtnStatus] = useState(false);
  const [btnText, setBtnText] = useState("LOGIN");

  // Context 
  const {user, setUser} = useContext(AppStateContext);
  const {uid, setUid} = useContext(AppStateContext);


  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    setBtnStatus(false)
    setBtnText('LOGIN')
  }, [isFocused]);

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
        Keyboard.dismiss;
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const isActive = (type) => {
    if (type === activeLogin) {
      return styles.buttonActive;
    } else {
      return styles.button;
    }
  };
  const isActiveText = (type) => {
    if (type === activeLogin) {
      return styles.activetext;
    } else {
      return styles.text;
    }
  };
  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };
  const login = () => {
    setBtnStatus(true)
    setBtnText("PLEASE WAIT...")
    if (!email && !password) {
      setBtnStatus(false)
      setBtnText("LOGIN")

      Alert.alert("Error", "Fields are required!");
      return
    }

    signInWithEmailAndPassword(passAuth(), email, password)
      .then((r) => {
        console.log(r)
        setUid(r['Uid'])
        setUser(r['user'])
        navigation.navigate("Dashboard");
      })
      .catch((e) => {
        setBtnStatus(false)
        setBtnText("LOGIN")
        console.log(e);
        Alert.alert("Error", "Something Went Wrong!");
      });
  };

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
        <Text style={styles.largeText}>Login Account</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={"Email"}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.password}
          secureTextEntry={true}
          placeholder={"Password"}
          onBlur={Keyboard.dismiss}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableHighlight
          style={styles.loginBtn}
          onPress={() => login()}
          activeOpacity={0.4}
          underlayColor="#e7decc"
          disabled={btnStatus}
        >
          <Text style={styles.loginBtnText}>{btnText}</Text>
        </TouchableHighlight>

        <Text
          style={styles.forgotPassword}
          onPress={() => goToForgotPassword()}
        >
          Forgot Password?
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  logo: {
    marginTop: 10,
    width: "50%",
    height: 100,
    resizeMode: "contain",
  },
  largeImage: {
    marginTop: -80,
    marginBottom: -60,
    width: "100%",
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
  btnLoginContainer: {
    marginTop: -80,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  loginFormContainer: {
    width: "100%",
  },
  registerFormContainer: {
    width: "100%",
    marginTop: 20,
  },
  displayNone: {
    display: "none",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  inputReg: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  password: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 20,
  },
  passwordReg: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  checboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { IconButton, Colors, TextInput } from "react-native-paper";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";

import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  ScrollView,
  Button,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { DocumentPicker, ImagePicker } from 'expo';

import * as DocumentPicker from "expo-document-picker";
import { AppStateContext } from "../Context";

const OriginalProfPic =
  "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13";
export default function Profile({ navigation }) {
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);

  const { account, setAccount } = useContext(AppStateContext);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState("SAVE PROFILE");

  const [data, setData] = useState(account);
  const isFocused = useIsFocused();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log((result))
    if (result.type === "cancel") {
      return;
    }
    setProfilePic(result.uri)
    const response = await fetch(result.uri);
    const blob = await response.blob();
    console.log(blob)
    setFile(blob)

  };

  const nav = useNavigation();
  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="magnify"
            color={Colors.red500}
            size={30}
            onPress={() => navigation.navigate("Search Schools", { screen: 'Search' })
            }
          />
          <IconButton
            icon="account"
            color={Colors.red500}
            size={30}
            onPress={() => navigate("Profile")}
          />
        </View>
      ),
    });
  });

  useEffect(() => {
    console.log(account)
    setData(account);
    setProfilePic(account.profilePic)
    setLoading(false);
    setLoadingBtn("SAVE PROFILE");
  }, [isFocused]);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  const updateData = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const textSlice = (item) => {
    let d = new Date(item);
    d = d.toString();
    return d.slice(0, 21);
  };

  const saveData = () => {
    setLoading(true);
    setLoadingBtn("PLEASE WAIT...");
    setAccount(data);

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    if (file) {
      // Upload first the profile picture.
      console.log('Will Upload a new one')
      const storage = getStorage();
      const picRef = storageRef(storage, "/profilePic/" + uniqid + ".jpeg");

      uploadBytes(picRef, file).then((snapshot) => {

        getDownloadURL(picRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateDatabase(downloadURL)

        });
      }).catch(() => console.log("Error"));
    } else {
      updateDatabase()
    }


  };
  const updateDatabase = (downloadURL) => {
    if (file) {
      data['profilePic'] = downloadURL
    }
    const db = getDatabase();
    const updates = {};
    updates["/Account/" + account.Uid] = data;
    update(ref(db), updates).then(() => {
      alert("Profile Updated");
      setLoading(false);
      setLoadingBtn("SAVE PROFILE");
    });
  }


  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 30, paddingTop: 20 }}>
          <TouchableHighlight
            onPress={() => pickDocument()}
            activeOpacity={0.4}
            style={styles.logo}
          >
            <Image
              source={profilePic ? { uri: profilePic } : { uri: OriginalProfPic }}
              onPress={() => pickDocument()}
              style={styles.logo}
            />
          </TouchableHighlight>
          <View style={styles.headingContainer}>
            <Text style={styles.heading1}>My Profile</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <TextInput
            label={'Email'}
            value={data.email}
            style={styles.inputDisabled}
            onChangeText={(email) => updateData(email, "email")}
            onSubmitEditing={Keyboard.dismiss}
            editable={false}
          />
          <TextInput
            label={'Firstname'}
            value={data.firstName}
            style={styles.input}
            onChangeText={(firstName) => updateData(firstName, "firstName")}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            label={'Lastname'}
            value={data.lastName}
            style={styles.input}
            onChangeText={(lastName) => updateData(lastName, "lastName")}
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            label={"Contact Number"}
            value={data.contactNumber}
            style={styles.input}
            onChangeText={(contactNumber) =>
              updateData(contactNumber, "contactNumber")
            }
            onSubmitEditing={Keyboard.dismiss}
          />
          <TextInput
            label={'Account Type'}
            value={data.type}
            style={styles.inputDisabled}
            onSubmitEditing={Keyboard.dismiss}
            editable={false}
          />
          <TextInput
            label={'Date Created'}
            value={textSlice(account.dateCreated)}
            style={styles.inputDisabled}
            onSubmitEditing={Keyboard.dismiss}
            editable={false}
          />
          <TouchableHighlight
            style={styles.btn}
            onPress={() => saveData()}
            activeOpacity={0.4}
            underlayColor="#e7decc"
            disabled={loading}
          >
            <Text style={styles.btnText}>{loadingBtn}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFB679",
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderRadius: 99,
    padding: 0,
  },
  heading1: {
    textAlign: "center",
    fontSize: 24,
    color: "#5F5E5E",
  },
  headingContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  input: {
    // height: 50,
    // padding: 10,
    // borderRadius: 4,
    // fontSize: 20,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  inputDisabled: {
    // height: 50,
    // padding: 10,
    // borderRadius: 4,
    // fontSize: 20,
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 10,
  },
  btn: {
    marginTop: 20,
    marginBottom: 50,
    width: "100%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

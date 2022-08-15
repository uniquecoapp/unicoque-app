import React, { useContext, useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
} from "react-native";

import { TextInput, IconButton, Colors } from "react-native-paper";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Card, Title, Paragraph } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";

import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onValue,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export default function EditArticle({ navigation, route }) {
  const { account } = useContext(AppStateContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uri, setUri] = useState(null);
  const { articlekey, uniKey, key } = route.params;
  const isFocused = useIsFocused();

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }
    // setUri(result.uri);

    const response = await fetch(result.uri);
    const blob = await response.blob();

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    const storage = getStorage();
    const picRef = storageRef(storage, "/articles/" + uniqid + ".jpeg");

    uploadBytes(picRef, blob)
      .then((snapshot) => {
        getDownloadURL(picRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUri(downloadURL);
        });
      })
      .catch(() => console.log("Error"));
  };

  useEffect(() => {
    setTitle(articlekey.title);
    setContent(articlekey.content);
    setUri(articlekey.articleImageURL);
  }, [isFocused]);

  const addArticle = () => {
    let date = Date.now();
    date = new Date(date);

    let data = {
      articleImageURL: uri ? uri : null,
      content: content,
      title: title,
      dateCreated: articlekey.dateCreated,
    };

    const db = getDatabase();
    const updates = {};
    updates["/university/" + account.Uid + "/articles/" + key] = data;
    update(ref(db), updates).then(() => {
      alert("Article Updated!");
      navigation.navigate("Articles list");
    });
  };

  const deleteArticle = () => {
    console.log(key)
    const db = getDatabase();
    const updates = {};
    updates["/university/" + account.Uid + "/articles/" + key] = null;
    update(ref(db), updates).then(() => {
      alert("Article Deleted");
      navigation.navigate("Articles list");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Edit Article</Text>
        <TextInput
          label={"Title"}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <TextInput
          style={{ marginTop: 20 }}
          label={"Content"}
          value={content}
          multiline
          numberOfLines={15}
          onChangeText={(value) => setContent(value)}
        />
        <TouchableHighlight
          style={styles.btn}
          activeOpacity={0.4}
          underlayColor="#e7decc"
          onPress={() => pickDocument()}
        >
          <Text style={styles.btnText}>Upload Image</Text>
        </TouchableHighlight>
        <Image
          style={{ width: "100%", height: 300 }}
          key={uri}
          source={
            uri
              ? { uri: uri }
              : {
                  uri: "https://admin.amslaw.ph/uploads/misc/noImagePreview.jpg",
                }
          }
        />
        <TouchableHighlight
          style={styles.btn}
          activeOpacity={0.4}
          underlayColor="#e7decc"
          onPress={() => addArticle()}
        >
          <Text style={styles.btnText}>PUBLISH ARTICLE</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.btnDelete}
          activeOpacity={0.4}
          underlayColor="#e7decc"
          onPress={() => deleteArticle()}
        >
          <Text style={styles.btnText}>DELETE ARTICLE</Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#EFB679",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnDelete: {
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "red",
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

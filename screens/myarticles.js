import React, { useContext, useState, useEffect } from "react";

import { StyleSheet, Text, SafeAreaView, ScrollView, View ,TouchableHighlight} from "react-native";

import { TextInput, IconButton, Colors } from "react-native-paper";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Card, Title, Paragraph } from "react-native-paper";

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

export default function MyArticles({ navigation }) {
  const { account } = useContext(AppStateContext);
  const isFocused = useIsFocused();
  const [articles, setArticles] = useState({});

  const clickArticle = (screen, articleKey,key) => {
    navigation.navigate(screen, {
      key:key,
      articlekey: articleKey,
      uniKey: account.Uid,
    });
  };

  useEffect(() => {
    console.log('reload');
    const db = getDatabase();
    const dataRef = ref(db, "university/" + account.Uid + "/articles/");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setArticles({ ...data });
      }
    });
  }, [isFocused]);

  const articlesList = Object.keys(articles).map((key) => (
    <Card
      style={styles.cards}
      key={key}
      onPress={() => clickArticle("Article", articles[key],key)}
    >
      <Card.Content>
        <Card.Cover
          source={
            articles[key].articleImageURL
              ? { uri: articles[key].articleImageURL }
              : {
                  uri: "https://www.detailingwiki.org/wp-content/uploads/2020/01/no-image.png",
                }
          }
        />
        <Title>{articles[key].title}</Title>
      </Card.Content>
    </Card>
  ));
  
  const addArticle =  () => {
    navigation.navigate('Create Articles');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:10}}>
          <Text style={styles.heading}>My Articles</Text>
          <TouchableHighlight
                style={styles.btn}
                onPress={() => addArticle()}
                //   onPress={() => console.log(data)}
                activeOpacity={0.4}
                underlayColor="#e7decc"
              >
                <Text style={styles.btnText}>Create Articles</Text>
              </TouchableHighlight>
        </View>
        {articlesList}
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  formGroupInput: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  btn: {
    width: "50%",
    backgroundColor: "#FF9829",
    paddingVertical: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  cards: {
    marginVertical: 10,
  },
});

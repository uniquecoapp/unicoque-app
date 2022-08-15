import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { Card, Title, Paragraph } from "react-native-paper";

export default function Article({ route, navigation }) {
  const nav = useNavigation();

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const isFocused = useIsFocused();
  const { articlekey, uniKey } = route.params;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    console.log(articlekey, uniKey);
    const UniRef = ref(db, "university/" + uniKey + "/articles/" + articlekey);
    onValue(UniRef, (snapshot) => {
      let value = snapshot.val();
      console.log(value);
      setArticle(value);
    });
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Article</Text>
        <Image
          source={
            article
              ? { uri: article.articleImageURL }
              : {
                  uri: "https://www.detailingwiki.org/wp-content/uploads/2020/01/no-image.png",
                }
          }
          style={styles.logo}
        />
        <Text style={styles.headingOne}>{article ? article.title: ''}</Text>
        <Text style={styles.headingTwo}>{article ? article.dateCreated: ''}</Text>

        <Paragraph>{article ? article.content : ''}</Paragraph>

        <View style={{height:50}}></View>
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
  headingOne: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  headingTwo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  logo: {
    width: '100%',
    height: 300,
    alignSelf: "center",
    padding: 0,
  },
});

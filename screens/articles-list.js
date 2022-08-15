import React, { useEffect, useState } from "react";

import { StyleSheet, Text, SafeAreaView, ScrollView, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { Card, Title, Paragraph } from "react-native-paper";

export default function ArticlesList({ route, navigation }) {
  const nav = useNavigation();

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const isFocused = useIsFocused();
  const { key } = route.params;
  const [articles, setArticles] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/" + key + "/articles");
    onValue(UniRef, (snapshot) => {
      let value = snapshot.val();
      setArticles({ ...value });
    });
  }, [isFocused]);

  const clickArticle = (screen, articleKey) => {
    navigation.navigate(screen, { articlekey: articleKey, uniKey: key });
  };

  const articlesList = Object.keys(articles).map((key) => (
    <Card
      style={styles.cards}
      key={key}
      onPress={() => clickArticle("Article", key)}
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Articles</Text>
        <View>{articles ? articlesList : <Text>test</Text>}</View>
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
  cards: {
    marginVertical: 10,
  },
});

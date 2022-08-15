import React, { useState, useEffect, useRef, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Button,
  TextInput,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { AppStateContext } from "../Context";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getDatabase, ref, onValue, update } from "firebase/database";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

export default function Review({ route, navigation }) {
  const nav = useNavigation();
  const { key } = route.params;

  const [reviewStar, setReviewStar] = useState(0);
  const [reviewText, setReviewText] = useState(null);
  const [reviews, setReviews] = useState({});
  const {account} = useContext(AppStateContext);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/" + key + "/reviews");
    onValue(UniRef, (snapshot) => {
      let value = snapshot.val();
      console.log(value);
      setReviews({ ...value });
    });
  }, [isFocused]);

  const postReview = () => {
    if (!reviewText) {
      alert("Comment Empty!");
      return;
    }
    const db = getDatabase();

    console.log(reviewStar, reviewText, account.Uid);
    let review = {
      Uid: account.Uid,
      comment: reviewText,
      name: account.firstName,
      rating: reviewStar,
    };
    let updates = {};
    updates["university/" + key + "/reviews/" + account.Uid] = review;
    update(ref(db), updates)
      .then(() => {
        console.log("updated");
        setReviewStar(null);
        setReviewText(0);
      })
      .catch(() => {});
  };

  const tifOptions = Object.keys(reviews).map((key) => (
    <Card style={{ marginBottom: 20 }} key={key}>
      <Card.Content>
        <Title>{reviews[key].comment}</Title>
        <View style={{ alignItems: "flex-start" }}>
          <Stars
            disabled={true}
            default={parseInt(reviews[key].rating)}
            count={5}
            style={{ alignSelf: "left" }}
            fullStar={
              <Icon name={"star"} size={20} style={[styles.myStarStyle]} />
            }
            emptyStar={
              <Icon
                name={"star-outline"}
                size={20}
                style={styles.myStarStyle}
              />
            }
            halfStar={
              <Icon name={"star-half"} size={20} style={[styles.myStarStyle]} />
            }
          />
        </View>

        <Paragraph>{reviews[key].name}</Paragraph>
      </Card.Content>
    </Card>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Reviews</Text>
       { 
       account.type.toLowerCase() === 'student' &&
       <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          value={reviewText}
          onChangeText={(reviewText) => setReviewText(reviewText)}
        />}
        {
          account.type.toLowerCase() === 'student' &&
          <View style={{ alignItems: "center" }}>
          <Stars
            default={reviewStar}
            count={5}
            update={(value) => setReviewStar(value)}
            fullStar={
              <Icon name={"star"} size={40} style={[styles.myStarStyle]} />
            }
            emptyStar={
              <Icon
                name={"star-outline"}
                size={40}
                style={styles.myStarStyle}
              />
            }
            halfStar={
              <Icon name={"star-half"} size={40} style={[styles.myStarStyle]} />
            }
          />
          <TouchableHighlight
            style={styles.btn}
            activeOpacity={0.4}
            underlayColor="#e7decc"
            onPress={() => postReview()}
          >
            <Text style={styles.btnText}>POST REVIEW</Text>
          </TouchableHighlight>
        </View>}
        <View>{tifOptions}</View>
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
  logo: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  input: {
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: "#fff",
    marginBottom: 20,
    textAlignVertical: "top",
  },
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  btn: {
    marginTop: 20,
    marginBottom: 50,
    width: "50%",
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

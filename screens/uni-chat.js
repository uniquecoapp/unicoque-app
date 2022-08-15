import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function UniChat({ route }) {
  const isFocused = useIsFocused();

  const [messages, setMessages] = useState([]);
  const [data, setData] = useState({});
  const [QnA, setQnA] = useState({});
  const { key } = route.params;

  useEffect(() => {
    const db = getDatabase();
    const UniRef = ref(db, "university/" + key + "/helpChat/");
    onValue(UniRef, (snapshot) => {
      let value = snapshot.val();
      let QandA = value.QnA;
      setData({ ...value });
      getMessageList(value.QnA)
    });
  }, [isFocused]);

  const getMessageList = (qna) => {
    let valuesList = [];
    let convoList = {}

    for (let [key, value] of Object.entries(qna)) {
      valuesList.push({
        title: qna[key].question,
        value: qna[key].answer,
      });
      convoList[qna[key].question] = qna[key].answer
    }

    console.log(convoList)
    setQnA({...convoList})

    setMessages([
      {
        _id: 1,
        text: "Hello How can I help you?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: valuesList,
        },
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
        },
      },
    ]);
  }

  const onSend = useCallback((messagesReply = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Object.keys(messages).length + 1,
          text: messagesReply[0].title,
          user: {
            _id: 1,
            name: "React Native",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
          },
        },
      ])
    );
    let messageTxt = messagesReply[0].value;
    console.log(messageTxt)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Object.keys(messages).length + 1,
          text: messageTxt,
          user: {
            _id: 2,
            name: "React Native",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
          },
        },
      ])
    );
  }, []);

  return (
    <GiftedChat
      onQuickReply={(messages) => onSend(messages)}
      minComposerHeight={0}
      maxComposerHeight={0}
      minInputToolbarHeight={0}
      renderInputToolbar={() => null}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

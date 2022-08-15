import React, { useState, useCallback, useEffect,useContext } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { AppStateContext } from "../Context";

var responses = {
  student1:
    "The colleges and universities around Quezon Province are schools that are available in UniQueCo Finder.",
  student2:
    "Click the search icon or in the “Search School” in your dashboard.\n\n- To search specific school, use the school’s name—based filter.\n\n- To search find schools in a specific location, use the location—based filter.\n\n- You could use the two-search filter at the same time to find school in aspecific location.",
  student3:
    'To match school, enter school type, program, and location. Adjust the seek bar to set the max tuition fee in your preferred value.” Click the button “Find a school match',
  student4:
    "All the information that displayed in the application are inputted by a school staff of a specific college/university. They have full control to the data.",
  uni1:"How to add school details?\n\n1. After logging in, you will be directed to the welcome page. Click the hamburger menu. At the left side you'll see 'University Details', just click on that.\n\n2. You’ll see a form to fill out. Enter the details of your school that you want to include in your school overview.\n\n3. Then click the “Save” button. Simply click 'View' to see the view of your school in the app. (It can be seen in the upper right corner of the page.)",
  uni2:'The colleges and universities around Quezon Province are schools that are available in UniQueCo Finder'
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const { account, setAccount } = useContext(AppStateContext);

  useEffect(() => {
    let replyList = []
    if(account.type ==='student'){
      replyList =[
        {
          title:'What schools are available in the UniCoQue Finder?',
          value:'student1'
        },
        {
          title:'How do I search specific school?',
          value:'student2'
        },
        {
          title:'How do I use matching tool?',
          value:'student3'
        },
        {
          title:'How accurate is the information in the UniCoQue Finder?',
          value:'student4'
        }

      ]
    }else{
      replyList = [
        {
          title:'How to add my school details?',
          value:'uni1'
        },
        {
          title:'What schools are available in the UniCoQue Finder?',
          value:'uni2'
        }

      ]
    }



    setMessages([
      {

        _id: 1,
        text: "Welcome! 👋 What can I help you with today?",
        createdAt: new Date(),
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: replyList,
        },
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messagesReply = []) => {

    if(account.type ==='student'){
      replyList =[
        {
          title:'What schools are available in the UniCoQue Finder?',
          value:'student1'
        },
        {
          title:'How do I search specific school?',
          value:'student2'
        },
        {
          title:'How do I use matching tool?',
          value:'student3'
        },
        {
          title:'How accurate is the information in the UniCoQue Finder?',
          value:'student4'
        }

      ]
    }else{
      replyList = [
        {
          title:'How to add my school details?',
          value:'uni1'
        },
        {
          title:'What schools are available in the UniCoQue Finder?',
          value:'uni2'
        }

      ]
    }

    console.log(Object.keys(messages).length)
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Object.keys(messages).length+ 1,
          text: messagesReply[0].title,
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
          },

        },
      ])
    );
    let messageTxt = messagesReply[0].value;
    setMessages((previousMessages) =>
    GiftedChat.append(previousMessages, [
      {
        _id: Object.keys(messages).length+ 1,
        text: responses[messageTxt],
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
        },
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: replyList,
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
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: "white",
              },
            }}
          />
        );
      }}
    />
  );
}

import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AppStateContext } from "../Context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation, useIsFocused } from "@react-navigation/native";


const CustomDrawer = (props) => {
  const {account} = useContext(AppStateContext);
  const nav = useNavigation();


  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Logout!')
        nav.navigate('Home')
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#FF9829" }}
      >
        <View style={{ padding: 20, alignItems: "center", flex: 1 }}>
          <Image
            source={
              account.profilePic
                ? {
                    uri: account.profilePic,
                  }
                : {
                    uri: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fdefault_profile.jpeg?alt=media&token=e8fc4a09-de30-4fb8-8416-168865072c13",
                  }
            }
            style={{ height: 130, width: 130, borderRadius: 9999 }}
          />
          <Text style={{ marginTop: 20, fontSize: 20 }}>
            {account.firstName} {account.lastName}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>{account.type}</Text>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableHighlight
        style={{
          paddingVertical: 20,
          paddingHorizontal: 25,
          justifyContent: "flex-end",
        }}
        onPress={() => logOut()}
        activeOpacity={0.6}
        underlayColor="#FF9829"
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Log out</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CustomDrawer;

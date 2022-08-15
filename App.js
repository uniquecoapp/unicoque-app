import { useContext } from "react";
import Home from "./screens/intro";
import Login from "./screens/login";
import Terms from "./screens/terms";
import ForgotPassword from "./screens/forgotPassword";
import Welcome from "./screens/welcome";
import Profile from "./screens/profile";
import Search from "./screens/search";
import SchoolView from "./screens/schoolView";
import Register from "./screens/register";
import { IconButton, Colors } from "react-native-paper";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Image, Button, View, TouchableHighlight } from "react-native";
import AppStateProvider from "./Context";
import Review from "./screens/review";
import ArticlesList from "./screens/articles-list";
import Article from "./screens/article";
import Favorite from "./screens/favorites";
import Match from "./screens/match";
import CustomDrawer from "./components/customDrawer";
import University from "./screens/university";
import MyArticles from "./screens/myarticles";

import { AppStateContext } from "./Context";
import CreateArticles from "./screens/add-article";
import EditArticle from "./screens/edit-article";
import About from "./screens/about";
import Chat from "./screens/chat";
import Map from "./screens/map";
import chatSettings from "./screens/chat-settings";
import UniChat from "./screens/uni-chat";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const headerLogo = (navigation) => {
    let options = {
      headerTitle: (
        props // App Logo
      ) => (
        <TouchableHighlight
          onPress={() => navigation.navigate("Welcome")}
          underlayColor={false}
        >
          <Image
            style={{ width: 150, height: 50 }}
            source={require("./assets/uniqueco-logo.png")}
            resizeMode="contain"
          />
        </TouchableHighlight>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="magnify"
            color={Colors.red500}
            size={30}
            onPress={() => navigation.navigate("Search")}
          />
          <IconButton
            icon="account"
            color={Colors.red500}
            size={30}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      ),
    };

    return options;
  };

  const Dashboard = () => {
    const { account } = useContext(AppStateContext);
    const { type } = useContext(AppStateContext);

    console.log(type);
    return (
      <Drawer.Navigator
        initialRouteName="Welcome"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#FF9829",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#333",
          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={Welcome}
          options={({ navigation }) => headerLogo(navigation)}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={({ navigation }) => headerLogo(navigation)}
        />
        <Drawer.Screen
          name="Search Schools"
          component={SchoolViewGroup}
          options={({ navigation }) => headerLogo(navigation)}
        />
        <Drawer.Screen
          name="My School Details"
          component={University}
          options={
            type === "university"
              ? ({ navigation }) => headerLogo(navigation)
              : { drawerItemStyle: { height: 0 } }
          }
        />
        <Drawer.Screen
          name="Favorites"
          component={FavoriteViewGroup}
          // options={({ navigation }) => headerLogo(navigation)}
          options={
            type === "student"
              ? ({ navigation }) => headerLogo(navigation)
              : { drawerItemStyle: { height: 0 } }
          }
        />
        <Drawer.Screen
          name="My Articles"
          component={MyArticlesGroup}
          options={
            type === "university"
              ? ({ navigation }) => headerLogo(navigation)
              : { drawerItemStyle: { height: 0 } }
          }
        />
        <Drawer.Screen
          name="Chat Settings"
          component={chatSettings}
          options={
            type === "university"
              ? ({ navigation }) => headerLogo(navigation)
              : { drawerItemStyle: { height: 0 } }
          }
        />

        <Drawer.Screen
          name="Match Schools"
          component={MatchViewGroup}
          options={({ navigation }) => headerLogo(navigation)}
        />
        <Drawer.Screen
          name="About Us"
          component={About}
          options={({ navigation }) => headerLogo(navigation)}
        />
        <Drawer.Screen
          name="Help Chat"
          component={Chat}
          options={({ navigation }) => headerLogo(navigation)}
        />
      </Drawer.Navigator>
    );
  };

  const MyArticlesGroup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Articles list"
          component={MyArticles}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Article"
          component={EditArticle}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Create Articles"
          component={CreateArticles}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
      </Stack.Navigator>
    );
  };

  const MatchViewGroup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Match"
          component={Match}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="SchoolView"
          component={SchoolView}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="ArticlesList"
          component={ArticlesList}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
      </Stack.Navigator>
    );
  };

  const FavoriteViewGroup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Favorite"
          component={Favorite}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="SchoolView"
          component={SchoolView}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="ArticlesList"
          component={ArticlesList}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
      </Stack.Navigator>
    );
  };
  const SchoolViewGroup = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="SchoolView"
          component={SchoolView}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="ArticlesList"
          component={ArticlesList}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Article"
          component={Article}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
                <Stack.Screen
          name="UniChat"
          component={UniChat}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
            swipeEdgeWidth: 0,
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <AppStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Terms"
            component={Terms}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
              swipeEdgeWidth: 0,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              swipeEdgeWidth: "100%",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppStateProvider>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';


export default function Terms({ navigation }) {

  const navigate = (screen) => {
    navigation.navigate(screen)
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={{marginBottom:30}}>
          <Image source={require("../assets/uniqueco-logo.png")} style={styles.logo} />
          <Text style={styles.heading1}>Terms of of Service and
            Privacy Policy
          </Text>
          <Text style={styles.paragraph}>To create an account, you need to agree to the Terms of Service below. In addition, when you create an account, we process your information as described in our Privacy Policy. Including the key points.</Text>
          <Text style={styles.paragraph}>Data we process when you use Google</Text>
          <Text style={styles.paragraph}>* When you set up a Google Account, we store information you give us like your name, email address and age.</Text>
          <Text style={styles.paragraph}>When you search for a university on this app or post reviews  for example, we process information like the reviews you posted.</Text>
          <Text style={styles.paragraph}>Information from uses with account</Text>
          <Text style={styles.paragraph}>If you create an account, we require some basic information at the time of the creation. You will crete your own user name and password, and we will ask you for valid email account. You also have the option to give us more information if you want to, and this may include “User Personal Information”</Text>
          <Text style={styles.paragraph}>“User Personal Information” is any information about one of our users which could, alone or together with other information, personally identify him or her. Information such as a name and password.</Text>
          <Text style={styles.paragraph}>We also collect potentially personal-identifying infomation like Internet Protocol (IP) address. Why do we collect this? We collect this information to monitor and protect the security of the website.</Text>
        </View>


      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  heading1: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  paragraph: {
    marginTop: 20,
    textAlign: 'justify'
  },
  footer: {
    flex: 1,
    paddingBottom: 50,
    height: 100
  }

});

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About({ navigation }) {
  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.headingOne}>System Description</Text>
        <Text style={styles.headingTwo}>Unicoque Finder</Text>
        <Text style={styles.paragraph}>
          The main purpose of the system is to help prospective college students
          on finding their ideal university in Quezon Province by developing an
          application called UniQueCo finder. This application will help to
          avoid numerous dropped-out or students who are switching schools
          because of the lack of information about the quality of school,
          tuition fee and courses it offers. Also, this will help the
          Universities and Colleges in Quezon Province be endorsed to
          prospective students as students can message or inquire about the
          schools.. UniQueCo finder has the following beneficiaries to society:
        </Text>
        <Text style={styles.headingOne}>The Team</Text>
        <View style={{ alignContent: "flex-start", paddingBottom: 20 }}>
          <Text style={styles.headingTwo}>Corpuz, Gulliver S.</Text>
          <Text style={styles.paragraph}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", paddingBottom: 20 }}>
          <Text style={styles.headingTwo}>De Leon, Shan Michael</Text>
          <Text style={styles.paragraph}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </Text>
        </View>
        <View style={{ alignContent: "flex-start", paddingBottom: 20 }}>
          <Text style={styles.headingTwo}>Nepomuceno, Marian Z.</Text>
          <Text style={styles.paragraph}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", paddingBottom: 20 }}>
          <Text style={styles.headingTwo}>Sigue, Maria Jessica Plinky V.</Text>
          <Text style={styles.paragraph}>
            hello
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </Text>
        <Text style={styles.paragraph}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBEBDA",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  headingOne: {
    fontSize: 32,
    fontWeight: "400",
    paddingVertical: 20,
  },
  headingTwo: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  paragraph: {
    lineHeight: 28,
    fontSize: 18,
    paddingBottom: 20,
  },
});

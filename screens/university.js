import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, IconButton, Colors } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  getDatabase,
  ref,
  update,
  onValue,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function University({ navigation }) {
  const { user, setUser } = useContext(AppStateContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Public");
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const isFocused = useIsFocused();

  const [data, setData] = useState({
    Name: "",
    Website: "",
    Email: "",
    contact: "",
    schoolType: "Public",
    preview:
      "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fyarn-error-removebg-preview.1aea60d3.png?alt=media&token=c1f19939-8281-4639-8b40-1bffe0dca716",
    logo: "https://firebasestorage.googleapis.com/v0/b/uniqueco-33e4c.appspot.com/o/app%2Fyarn-error-removebg-preview.1aea60d3.png?alt=media&token=c1f19939-8281-4639-8b40-1bffe0dca716",
    SchoolDetails: {
      AboutSchool: "",
      Goal: "",
      Mission: "",
      Qoute: "",
      Vission: "",
    },
    Address: {
      Barangay: "",
      City: "",
      Country: "",
      Province: "",
      Lot: "",
      Zipcode: "",
      gmap: "",
    },
    ProgramsOffered: {
      randomID1: {
        Field: "",
        TuitionMax: "",
        TuitionMin: "",
        programs: "",
      },
    },
    SchoolPerformance: {
      Ranking: "",
      Others: "",
      BoardPerformance: "",
    },
    Requirements: {
      Freshmen: "",
      CrossEnrolles: "",
      SecondCourse: "",
    },
  });

  useEffect(() => {
    // Get account information on Firebase
    const db = getDatabase();
    const dataRef = ref(db, "university/" + user.Uid);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData({ ...data });
    });
  }, [isFocused]);

  const navigate = (screen) => {
    navigation.navigate(screen);
  };
  const [items, setItems] = useState([
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
  ]);

  const pickLogo = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }
    // setLogo(result.uri);

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    const response = await fetch(result.uri);
    const blob = await response.blob();
    setLogoFile(blob);

    const storage = getStorage();
    const picRef = storageRef(storage, "/logo/" + uniqid + ".jpeg");

    uploadBytes(picRef, blob)
      .then((snapshot) => {
        getDownloadURL(picRef).then((downloadURL) => {
          updateData(downloadURL, "logo");
        });
      })
      .catch(() => console.log("Error"));
  };

  const pickPreview = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "cancel") {
      return;
    }
    // setLogo(result.uri);

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    const response = await fetch(result.uri);
    const blob = await response.blob();
    setLogoFile(blob);

    const storage = getStorage();
    const picRef = storageRef(storage, "/logo/" + uniqid + ".jpeg");

    uploadBytes(picRef, blob)
      .then((snapshot) => {
        getDownloadURL(picRef).then((downloadURL) => {
          updateData(downloadURL, "preview");
        });
      })
      .catch(() => console.log("Error"));
  };

  const updateData = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const updateAddress = (value, type) => {
    let Address = "Address";
    setData((prevState) => ({
      ...prevState,
      Address: { ...prevState.Address, [type]: value },
    }));
  };
  const updateSchoolDetails = (value, type) => {
    let Address = "Address";
    setData((prevState) => ({
      ...prevState,
      SchoolDetails: { ...prevState.SchoolDetails, [type]: value },
    }));
  };
  const updateSchoolPerformance = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      SchoolPerformance: { ...prevState.SchoolPerformance, [type]: value },
    }));
  };

  const updateAdmissionRequirements = (value, type) => {
    setData((prevState) => ({
      ...prevState,
      Requirements: { ...prevState.Requirements, [type]: value },
    }));
  };

  useEffect(() => {
    updateData(value, "schoolType");
  }, [value]);

  const programsList = Object.keys(data.ProgramsOffered).map((key) => (
    <View
      key={key}
      style={{ marginTop: 20, marginBottom: 30, borderBottomWidth: 1 }}
    >
      <TextInput
        label={"Field Name"}
        style={styles.formGroupInput}
        value={data.ProgramsOffered[key].Field}
        onChangeText={(value) => onUpdateProgram(value, key, "Field")}
      />
      <TextInput
        label={"Minimum Tuition Fee"}
        style={styles.formGroupInput}
        value={data.ProgramsOffered[key].TuitionMin}
        onChangeText={(value) => onUpdateProgram(value, key, "TuitionMin")}
      />
      <TextInput
        label={"Minimum Tuition Fee"}
        style={styles.formGroupInput}
        value={data.ProgramsOffered[key].TuitionMax}
        onChangeText={(value) => onUpdateProgram(value, key, "TuitionMax")}
      />
      <TextInput
        label={"Programs"}
        style={styles.formGroupInput}
        multiline
        value={data.ProgramsOffered[key].programs}
        onChangeText={(value) => onUpdateProgram(value, key, "programs")}
        // value={data.ProgramsOffered[key].programs}
      />
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <TouchableHighlight
          style={styles.btnRemove}
          onPress={() => removeProgram(key)}
          //   onPress={() => console.log(data)}
          activeOpacity={0.4}
          underlayColor="#e7decc"
        >
          <Text style={styles.btnText}>Remove Program</Text>
        </TouchableHighlight>
      </View>
    </View>
  ));
  const onUpdateProgram = (value, key, type) => {
    setData((prevState) => ({
      ...prevState,
      ProgramsOffered: {
        ...prevState.ProgramsOffered,
        [key]: {
          ...prevState.ProgramsOffered[key],
          [type]: value,
        },
      },
    }));
  };

  const addProgram = () => {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();

    let programs = data.ProgramsOffered;
    programs[uniqid] = {
      Field: "",
      TuitionMax: "",
      TuitionMin: "",
      programs: "",
    };

    updateData(programs, "ProgramsOffered");
  };

  const removeProgram = (key) => {
    let programs = data.ProgramsOffered;
    delete programs[key];
    updateData(programs, "ProgramsOffered");
  };

  const save = () => {
    const db = getDatabase();
    const updates = {};
    const date = new Date();  // 2009-11-10
    const dateString = date.toLocaleString('default', { month: 'long',day:'2-digit',year:'numeric', minute:'2-digit', hour:'numeric' });
    let updatedData = data
    updatedData['lastUpdated'] = dateString
    updates["/university/" + user.Uid] = updatedData;
    update(ref(db), updates).then(() => {
      console.log("University Updated");
      Alert.alert("Update", "University Details Updated!");
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.padding}>
          <Text style={styles.heading}>
            Fill up the University Information/Detail Below
          </Text>
          <Text style={{marginTop:20}}>
            Last Updated: {data.lastUpdated}
          </Text>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>University Details</Text>
            <TextInput
              label={"University Name"}
              style={styles.formGroupInput}
              value={data.Name}
              onChangeText={(Name) => updateData(Name, "Name")}
            />
            <TextInput
              label={"Website"}
              style={styles.formGroupInput}
              value={data.Website}
              onChangeText={(value) => updateData(value, "Website")}
            />
            <TextInput
              label={"Email"}
              style={styles.formGroupInput}
              value={data.Email}
              onChangeText={(value) => updateData(value, "Email")}
            />
            <TextInput
              label={"Contact Number"}
              style={styles.formGroupInput}
              value={data.contact}
              onChangeText={(value) => updateData(value, "contact")}
            />
            <Text style={styles.formGroupLabel}>University Type</Text>

            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
              ]}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              theme="LIGHT"
              style={{ marginBottom: 20 }}
            />
            <Text style={styles.formGroupLabel}>University Preview Image</Text>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight
                style={styles.btn}
                onPress={() => pickPreview()}
                activeOpacity={0.4}
                underlayColor="#e7decc"
              >
                <Text style={styles.btnText}>Select Preview</Text>
              </TouchableHighlight>
              <Image source={{ uri: data.preview }} style={styles.logo} />
            </View>
            <Text style={styles.formGroupLabel}>University Logo</Text>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight
                style={styles.btn}
                onPress={() => pickLogo()}
                activeOpacity={0.4}
                underlayColor="#e7decc"
              >
                <Text style={styles.btnText}>Select Logo</Text>
              </TouchableHighlight>
            </View>

            <Image source={{ uri: data.logo }} style={styles.logo} />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>Address</Text>
            <TextInput
              label={"Lot"}
              style={styles.formGroupInput}
              value={data.Address.Lot}
              onChangeText={(value) => updateAddress(value, "Lot")}
            />
            <TextInput
              label={"Barangay"}
              style={styles.formGroupInput}
              value={data.Address.Barangay}
              onChangeText={(value) => updateAddress(value, "Barangay")}
            />
            <TextInput
              label={"City/Municipality"}
              style={styles.formGroupInput}
              value={data.Address.City}
              onChangeText={(value) => updateAddress(value, "City")}
            />
            <TextInput
              label={"Province"}
              style={styles.formGroupInput}
              value={data.Address.Province}
              onChangeText={(value) => updateAddress(value, "Province")}
            />
            <TextInput
              label={"ZipCode"}
              style={styles.formGroupInput}
              value={data.Address.Zipcode}
              onChangeText={(value) => updateAddress(value, "Zipcode")}
            />
            <TextInput
              label={"Map Embedded HTML code"}
              style={styles.formGroupInput}
              value={data.Address.gmap}
              onChangeText={(value) => updateAddress(value, "gmap")}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>
              University Mission and Vision
            </Text>
            <TextInput
              label={"School Qoute"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Qoute}
              onChangeText={(value) => updateSchoolDetails(value, "Qoute")}
            />
            <TextInput
              label={"About School"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.AboutSchool}
              onChangeText={(value) =>
                updateSchoolDetails(value, "AboutSchool")
              }
            />
            <TextInput
              label={"Mission"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Mission}
              onChangeText={(value) => updateSchoolDetails(value, "Mission")}
            />
            <TextInput
              label={"Vision"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Vission}
              onChangeText={(value) => updateSchoolDetails(value, "Vission")}
            />
            <TextInput
              label={"Goals"}
              style={styles.formGroupInput}
              value={data.SchoolDetails.Goal}
              onChangeText={(value) => updateSchoolDetails(value, "Goal")}
            />
          </View>
          <View style={styles.formGroup}>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.formGroupLabel}>Programs Offered</Text>
            </View>
            {programsList}
            <View style={{alignItems:'center'}}>
              <TouchableHighlight
                style={styles.btn}
                onPress={() => addProgram()}
                activeOpacity={0.4}
                underlayColor="#e7decc"
              >
                <Text style={styles.btnText}>Add Program</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>University Performance</Text>
            <TextInput
              label={"Rankings"}
              style={styles.formGroupInput}
              value={data.SchoolPerformance.Ranking}
              onChangeText={(value) =>
                updateSchoolPerformance(value, "Ranking")
              }
            />
            <TextInput
              label={"Board Exam Performance"}
              style={styles.formGroupInput}
              value={data.SchoolPerformance.BoardPerformance}
              onChangeText={(value) =>
                updateSchoolPerformance(value, "BoardPerformance")
              }
            />
            <TextInput
              label={"Others"}
              style={styles.formGroupInput}
              value={data.SchoolPerformance.Others}
              onChangeText={(value) => updateSchoolPerformance(value, "Others")}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>Admission Requirments</Text>
            <TextInput
              label={"Freshmen"}
              multiline
              style={styles.formGroupInput}
              value={data.Requirements.Freshmen}
              onChangeText={(value) =>
                updateAdmissionRequirements(value, "Freshmen")
              }
            />
            <TextInput
              label={"Cross Enrolles"}
              multiline
              style={styles.formGroupInput}
              value={data.Requirements.CrossEnrolles}
              onChangeText={(value) =>
                updateAdmissionRequirements(value, "CrossEnrolles")
              }
            />
            <TextInput
              label={"Second Course Enrolles"}
              multiline
              style={styles.formGroupInput}
              value={data.Requirements.SecondCourse}
              onChangeText={(value) =>
                updateAdmissionRequirements(value, "SecondCourse")
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formGroupLabel}>Scholarship</Text>

            <TextInput
              label={"List of Scholarship offered"}
              multiline
              style={styles.formGroupInput}
              value={data.Scholarship}
              onChangeText={(value) => updateData(value, "Scholarship")}
            />
          </View>
          <View style={styles.btnSaveContainer}>
            <TouchableHighlight
              style={styles.btnSave}
              activeOpacity={0.4}
              underlayColor="#e7decc"
              onPress={() => save()}
            >
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFB679",
  },
  padding: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  formGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  formGroupLabel: {
    fontSize: 18,
    marginBottom: 10,
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
  btnSave: {
    width: "100%",
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
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    padding: 0,
    marginTop: 30,
  },

  btnRemove: {
    width: "50%",
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
});

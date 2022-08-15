import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { AppStateContext } from "../Context";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Map({ route }) {
  const isFocused = useIsFocused();
  const { account } = useContext(AppStateContext);
  const { key } = route.params;
  const [lat, setLat] = useState(121.6234);
  const [long, setLong] = useState(13.9414);

  useEffect(() => {
    console.log(key);
    const db = getDatabase();
    const UniRef = ref(db, "university/" + key);
    onValue(UniRef, (snapshot) => {
      const data = snapshot.val();
      geolocation(data.Address);
    });
  }, [isFocused]);

  const geolocation = (Address) => {
    var requestOptions = {
      method: "GET",
    };
    console.log(Address);
    fetch(
      `http://api.positionstack.com/v1/forward?query=${Address.Lot}&access_key=088bce4d812678f6a3a4a7b366ae362c`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => findCounty(result.data, Address.City))
      .catch((error) => console.log("error", error));
  };

  const findCounty = (results, City) => {
    console.log(results);
    results.forEach(function (item, index) {
      let county = item.county;
      if (county) {
        county = county.toLowerCase();
      } else {
        county = "null";
      }
      City = City.toLowerCase();
      if (county.includes(City)) {
        setLong(item.latitude);
        setLat(item.longitude);
        console.log(lat);
        console.log(long);
        return;
      }
    });

  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          longitude: lat,
          latitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            longitude: lat,
            latitude: long,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

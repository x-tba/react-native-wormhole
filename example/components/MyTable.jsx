import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function MyTable({ dataFromFE, stylesFromFE }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, stylesFromFE?.title]}>
        {dataFromFE?.screenTitle ? dataFromFE.screenTitle : "Data from BE"}
      </Text>
      {isLoading ? (
        <Text style={styles.title}>Loading Data...</Text>
      ) : (
        <FlatList
          data={dataFromFE?.data ? dataFromFE.data : data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: { fontSize: 12, fontWeight: "bold", textAlign: "left" },
});

const Item = ({ item }) => (
  <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
    <View style={{ width: 20, backgroundColor: "lightyellow" }}>
      <Text style={styles.text}>{item.id}</Text>
    </View>
    <View style={{ width: 160, backgroundColor: "lightpink" }}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
    <View style={{ width: 220, backgroundColor: "lavender" }}>
      <Text style={styles.text}>{item.email}</Text>
    </View>
  </View>
);

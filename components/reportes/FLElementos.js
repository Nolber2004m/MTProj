import React, { useRef } from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";


export default function FLElementos(navigation) {
    // Generating dummy data
const DATA = Array.from({ length: 100 }, (v, i) => `List item ${i}`);
const myRef = useRef(null);
return (
  <View style={styles.container}>
    <Button
      title="Scroll to a random item"
      onPress={() => {
        const randomIndex = Math.floor(Math.random() * DATA.length);
        myRef.current.scrollToIndex({
          animated: true,
          index: randomIndex,
        });
      }}
    />
    <FlatList
      ref={myRef}
      getItemLayout={(data, index) => ({
        length: DATA.length,
        offset: DATA.length * index,
        index,
      })}
      keyExtractor={(item, index) => index.toString()}
      data={DATA}
      renderItem={(itemData) => {
        return (
          <View style={styles.listItem}>
            <Text style={styles.text}>{itemData.item}</Text>
          </View>
        );
      }}
    />
  </View>
);
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: 16,
      paddingTop: 100,
    },
    listItem: {
      backgroundColor: "#2ecc71",
      borderWidth: 1,
      borderColor: "#333",
      padding: 25,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });
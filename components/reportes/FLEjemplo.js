import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";


export default function FLEjemplo({navigation}) {
    
const ANIMALS = ["Dog", "Cat", "Chicken", "Dragon", "Camel"];

return (
    <View style={styles.container}>
      <FlatList
        data={ANIMALS}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(animal) => {
          return (
            <View style={styles.listItem}>
              <Text>{animal.item}</Text>
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
    backgroundColor: "#499fff",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
});
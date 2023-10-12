import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, TextInput } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TodoRow(props) {
  return (
    <View style={rowstyles.todorow}>
      <Text>{props.todoinfo.key}</Text>
      {props.todoinfo.isdone && <Text> KLAR</Text>}

      <Button
        title="KLAR"
        onPress={() => {
          props.todoChangeDone();
        }}
      />

      <Button
        title="DELETE"
        onPress={() => {
          props.todoDelete();
        }}
      />
    </View>
  );
}

const rowstyles = StyleSheet.create({
  todorow: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

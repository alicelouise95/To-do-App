import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, TextInput } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TodoRow(props) {
  return (
    <View style={rowstyles.todorow}>
      <Text style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        {props.todoinfo.key}
      </Text>
      {props.todoinfo.isdone && <Text>Task done</Text>}

      <Button
        title={props.todoinfo.isdone ? "Set not done" : "Set done"}
        onPress={() => {
          props.todoChangeDone();
        }}
      />

      <Button
        title="Delete"
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
    flexDirection: "row",
    borderRadius: 30,
    alignItems: "center",
  },
});

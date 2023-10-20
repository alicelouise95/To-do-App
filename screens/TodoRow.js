import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TodoRow(props) {
  return (
    <View style={rowstyles.todorow}>
      <Text style={rowstyles.rowText}>{props.todoinfo.key}</Text>
      {props.todoinfo.isdone && <Text></Text>}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            props.todoChangeDone();
            Alert.alert(
              props.todoinfo.isdone ? "Task completed" : "Task re-added to list"
            );
          }}
        >
          <Image
            source={
              props.todoinfo.isdone
                ? require("../assets/Undo.png")
                : require("../assets/Done.png")
            }
            style={{ width: 30, height: 30, margin: 5 }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          props.todoDelete();
          Alert.alert("Task deleted.");
        }}
      >
        <Image
          source={require("../assets/Remove.png")}
          style={{ width: 30, height: 30, margin: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const rowstyles = StyleSheet.create({
  todorow: {
    flex: 1,
    backgroundColor: "#F1B4BB",
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
  },

  rowText: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    color: "#1F4172",
  },
});

/*
<Button
title={props.todoinfo.isdone ? "-" : "✓"}
onPress={() => {
  props.todoChangeDone();
  Alert.alert(
    props.todoinfo.isdone
      ? "Task Completed"
      : "Task re-added to your list"
  );
}}
color="rgb(19, 32, 67)"
/>
*/

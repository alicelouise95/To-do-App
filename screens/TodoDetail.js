import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import TodoErrorbox from "./TodoErrorbox";

export default function TodoDetail({ route, navigation }) {
  const [todotitle, setTodotitle] = useState(route.params.todoitem.key);
  const [errormessage, setErrormessage] = useState("");

  function savetodo() {
    if (todotitle == "") {
      setErrormessage("You need to write something!");
    } else {
      navigation.navigate({
        name: "todo",
        params: { todoname: todotitle, rownumb: route.params.rownumb },
        merge: true,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>TODO DETAIL</Text>

      {errormessage !== "" && (
        <TodoErrorbox
          errormessage={errormessage}
          clickbox={() => setErrormessage("")}
        />
      )}

      <TextInput
        value={todotitle}
        onChangeText={setTodotitle}
        placeholder="Change the title"
      />

      <Button
        title="Save"
        onPress={() => {
          savetodo();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightpink",
    alignItems: "center",
    justifyContent: "center",
  },
});

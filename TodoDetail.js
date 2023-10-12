import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TodoDetail({ route, navigation }) {
  const [todotitle, setTodotitle] = useState(route.params.todoitem.key);

  return (
    <View>
      <Text>TODO DETAIL</Text>
      <TextInput
        value={todotitle}
        onChangeText={setTodotitle}
        placeholder="Change the title"
      />

      <Button
        title="Save"
        onPress={() => {
          navigation.navigate({
            name: "todo",
            params: { todoname: todotitle, rownumb: route.params.rownumb },
            merge: true,
          });
        }}
      />
    </View>
  );
}

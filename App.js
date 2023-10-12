import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import TodoScreen from "./TodoScreen";
import TodoDetail from "./TodoDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="todo">
        <Stack.Screen name="todo" component={TodoScreen} />
        <Stack.Screen name="TodoDetail" component={TodoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

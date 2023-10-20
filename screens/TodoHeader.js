import { useState } from "react";
import { Text, View } from "react-native";

export default function TodoHeader() {
  return (
    <View
      style={{
        height: 50,
        width: "100%",
        backgroundColor: "#F1B4BB",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center", color: "#1F4172", fontSize: 30 }}>
        Alice's to-do list
      </Text>
    </View>
  );
}

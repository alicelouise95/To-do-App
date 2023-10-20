import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function TodoErrorbox(props) {
  const [errormessage, setErrormessage] = useState(props.errormessage);

  return (
    <TouchableOpacity
      onPress={() => {
        props.clickbox();
      }}
    >
      <View style={styles.errorbox}>
        <Text style={styles.errorText}>{errormessage}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  errorbox: {
    width: "70%",
    height: 40,
    marginTop: 20,
  },

  errorText: {
    color: "red",
  },
});

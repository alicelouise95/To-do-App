import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import TodoRow from "./TodoRow";
import TodoHeader from "./TodoHeader";
import TodoErrorbox from "./TodoErrorbox";
import { doFunStuff, sortByDone } from "./TodoHelper";

export default function TodoScreen({ navigation, route }) {
  const [addtodo, setAddtodo] = useState("");

  const [todoitems, setTodoitems] = useState([
    { key: "Example task 1", isdone: false },
    { key: "Example task 2", isdone: true },
  ]);

  const [errormessage, setErrormessage] = useState("");

  const [listtype, setListtype] = useState("all");

  useEffect(() => {
    if (route.params?.todoname) {
      console.log("Saved");
      console.log(route.params.todoname);

      const newlist = [...todoitems];
      newlist[route.params.rownumb].key = route.params.todoname;
      setTodoitems(newlist);
    }
  }, [route.params?.todoname]);

  function addToTheList() {
    if (addtodo !== "") {
      const newtodo = todoitems.concat({ key: addtodo });
      newtodo.sort(sortByDone);
      setTodoitems(newtodo);
      setAddtodo("");
      setErrormessage("");
    } else {
      setErrormessage("You need to enter something!");

      setTimeout(() => {
        setErrormessage("");
      }, 10000);
    }
  }

  function changeDone(rownumber) {
    const newlist = [...todoitems];

    if (newlist[rownumber].isdone == true) {
      newlist[rownumber].isdone = false;
    } else {
      newlist[rownumber].isdone = true;
    }

    newlist.sort(sortByDone);

    setTodoitems(newlist);
  }

  function deleteTodo(rownumber) {
    const newlistStart = [...todoitems].slice(0, rownumber);
    const newlistEnd = [...todoitems].slice(rownumber + 1);
    const newlist = newlistStart.concat(newlistEnd);

    setTodoitems(newlist);
  }

  function filtertodo(todo) {
    if (listtype == "all") {
      return true;
    }
    if (listtype == "done") {
      return todo.isdone == true;
    }
    if (listtype == "todo") {
      return todo.isdone != true;
    }
  }

  return (
    <View style={styles.container}>
      <TodoHeader />

      {errormessage !== "" && (
        <TodoErrorbox
          errormessage={errormessage}
          clickbox={() => setErrormessage("")}
        />
      )}

      <View style={styles.todoinputcontainer}>
        <TextInput
          value={addtodo}
          onChangeText={setAddtodo}
          placeholder="Add todo"
          style={{ flex: 1 }}
        />

        <Button
          title="Add"
          onPress={() => {
            addToTheList();
          }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Button
          title="All"
          onPress={() => {
            setListtype("all");
          }}
        />
        <Button
          title="To do"
          onPress={() => {
            setListtype("todo");
          }}
        />
        <Button
          title="Done"
          onPress={() => {
            setListtype("done");
          }}
        />
      </View>

      <FlatList
        data={todoitems.filter(filtertodo)}
        style={styles.todoList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ borderWidth: 1, borderRadius: 30, margin: 10 }}
            onPress={() => {
              doFunStuff();
              navigation.push("TodoDetail", { todoitem: item, rownumb: index });
            }}
          >
            <TodoRow
              todoinfo={item}
              todoChangeDone={() => {
                console.log("Changes complete." + index);
                changeDone(index);
              }}
              todoDelete={() => {
                deleteTodo(index);
              }}
            />
          </TouchableOpacity>
        )}
      />

      <StatusBar style="auto" />
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
  finbild: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    backgroundColor: "#ff0000",
  },

  todoinputcontainer: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },

  todoList: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
});

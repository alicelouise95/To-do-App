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
    { key: "Example task 2", isdone: false },
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
          placeholder="Enter a task"
          style={styles.addTextinput}
          onSubmitEditing={() => {
            addToTheList();
          }}
        />

        <TouchableOpacity
          onPress={() => {
            addToTheList();
          }}
        >
          <Image
            source={require("../assets/Add.png")}
            style={{ width: 30, height: 30, margin: 5 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filterButtons}>
        <TouchableOpacity
          onPress={() => {
            setListtype("all");
          }}
          style={
            listtype == "all"
              ? styles.filterSelectedButton
              : styles.filterNotSelectedButton
          }
        >
          <Text style={{ textAlign: "center" }}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setListtype("todo");
          }}
          style={
            listtype == "todo"
              ? styles.filterSelectedButton
              : styles.filterNotSelectedButton
          }
        >
          <Text style={{ textAlign: "center" }}>To-do</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setListtype("done");
          }}
          style={
            listtype == "done"
              ? styles.filterSelectedButton
              : styles.filterNotSelectedButton
          }
        >
          <Text style={{ textAlign: "center" }}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={todoitems.filter(filtertodo)}
          style={styles.todoList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => {
                doFunStuff();
                navigation.push("TodoDetail", {
                  todoitem: item,
                  rownumb: index,
                });
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
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  todoinputcontainer: {
    flexDirection: "row",
    backgroundColor: "#F1B4BB",
    width: "100%",
    padding: 20,
    borderTopWidth: 0.5,
  },

  addTextinput: {
    flex: 1,
    paddingLeft: 10,
    borderRadius: 15,
    borderWidth: 1,
  },

  todoList: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
  },

  filterButtons: {
    flexDirection: "row",
    backgroundColor: "#F1B4BB",
    width: "100%",
    height: 40,
    paddingLeft: 5,
  },

  filterSelectedButton: {
    backgroundColor: "#db848e",
    width: "33%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
  },
  filterNotSelectedButton: {
    backgroundColor: "#F1B4BB",
    width: "33%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
  },

  listContainer: {
    flex: 1,
    backgroundColor: "#fad9d9",
    borderTopWidth: 1,
    width: "100%",
  },
});

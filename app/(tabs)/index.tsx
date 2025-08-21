import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";

import { Text, TouchableOpacity, View } from "react-native";



export default function Index() {
  const { toggleDarkMode } = useTheme();

  const todos = useQuery(api.todos.getTodos);
console.log(todos?.length);

 const addtodo = useMutation(api.todos.addTodo);
const deletealltodo = useMutation(api.todos.clearAllTodos);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ea1414ff",
       
      }}
    >
      <Text>Hello world</Text>
      <Text>Welcome to the app!</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>toggle mode</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addtodo({ title: "New Todo" })}>
        <Text>add todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletealltodo()}>
        <Text>delete all the  todo</Text>
      </TouchableOpacity>
    </View>
  );
}

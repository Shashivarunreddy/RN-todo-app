import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";

import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const homestyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);
  if (isLoading) return <LoadingSpinner />;
  const handleToggeleTodo = async (id:Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error", "There was an error toggling the todo item.");
    }
  }

  const handleDeleteTodo = async (id:Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" , onPress: async () => deleteTodo({ id })},
    ])
  }

  const handleEditTodo = (todo:Todo) => {
    setEditText(todo.title);
    setEditingId(todo._id);
  }

  const handleSaveEdit = async () => {
    if(editingId){
    try {
      await updateTodo({ id: editingId!, title: editText.trim() });
      setEditText("");
      setEditingId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
      Alert.alert("Error", "There was an error updating the todo item.");
    }
  }
  }

  const handleCancleEdit = () => {
    setEditText("");
    setEditingId(null);
  }
  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homestyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homestyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homestyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggeleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homestyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={homestyles.editContainer}>
              <TextInput
               style={homestyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homestyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homestyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancleEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homestyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homestyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

          ) : (
            <View style={homestyles.todoTextContainer}>
            <Text
              style={[
                homestyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.title}
            </Text>

             <View style={homestyles.todoActions}>
              <TouchableOpacity onPress={() => handleEditTodo(item) }activeOpacity={0.8}>
                 <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />

                 </LinearGradient>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8} >
                 <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                 </LinearGradient>
              </TouchableOpacity>
             </View>
          </View>
        )
      }
          
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homestyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homestyles.safeArea}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homestyles.todoList}
          contentContainerStyle={homestyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

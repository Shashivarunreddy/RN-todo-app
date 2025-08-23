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
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;
  const toggleTodo = useMutation(api.todos.toggleTodo);
  if (isLoading) return <LoadingSpinner />;
  const handleToggeleTodo = async (id:Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error", "There was an error toggling the todo item.");
    }
  }


  const renderTodoItem = ({ item }: { item: Todo }) => {
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
              <TouchableOpacity onPress={() =>{} }activeOpacity={0.8}>
                 <LinearGradient colors={colors.gradients.warning} style={homestyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />

                 </LinearGradient>

              </TouchableOpacity>
              <TouchableOpacity onPress={() =>{} }activeOpacity={0.8}>
                 <LinearGradient colors={colors.gradients.danger} style={homestyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />

                 </LinearGradient>
                
              </TouchableOpacity>
             </View>
          </View>
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

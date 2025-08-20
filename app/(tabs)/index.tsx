import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
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
      
    </View>
  );
}

import { Tabs } from 'expo-router'

import { Ionicons } from "@expo/vector-icons"
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "green",
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          backgroundColor: "#272424ff",
          borderTopColor: "#272424ff",
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle:{
          fontSize: 16,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Todos',
          tabBarIcon: ({ color,size }) => (
            <Ionicons  name='flash-outline' size={size} color={color} />
          ) 
        }}
      />

        <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({color,size}) =>(
            <Ionicons  name='settings' size={size} color={color} />
          ) 
        }}
      />

    </Tabs>
  )
}
export default TabsLayout
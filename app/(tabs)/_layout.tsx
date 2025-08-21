import { Tabs } from 'expo-router'

import { Ionicons } from "@expo/vector-icons"
import { useTheme } from '@/hooks/useTheme';
const TabsLayout = () => {
  const { colors} = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colors.textMuted,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
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
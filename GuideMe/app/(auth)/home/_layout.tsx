import { router, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../_layout";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false, title: "Home", tabBarIcon: ({color})=><Ionicons name="home-outline" size={24} color={color}/>}} />
      <Tabs.Screen name="projects" options={{ headerShown: false, title: "Projects", tabBarIcon: ({color})=><Ionicons name="checkbox-outline" size={24} color={color}/>}} />
      <Tabs.Screen name="search" options={{ headerShown: false, title: "Search", tabBarIcon: ({color})=><Ionicons name="search-outline" size={24} color={color}/>}} />
    </Tabs>
  );
}

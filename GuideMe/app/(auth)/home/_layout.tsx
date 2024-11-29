import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false, title: "Home", tabBarIcon: ({color})=><Ionicons name="home-outline" size={24} color={color}/>}} />
      <Tabs.Screen name="project" options={{ headerShown: false, title: "My Projects", tabBarIcon: ({color})=><Ionicons name="checkbox-outline" size={24} color={color}/>}} />
      <Tabs.Screen name="search" options={{ headerShown: false, title: "Search", tabBarIcon: ({color})=><Ionicons name="search-outline" size={24} color={color}/>}} />
      <Tabs.Screen name="profile" options={{ headerShown: false, title: "Profile", tabBarIcon: ({color})=><Ionicons name="person-outline" size={24} color={color}/>}} />
    </Tabs>
  );
}

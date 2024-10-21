import { router, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../_layout";

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false, title: "Home" }} />
      <Tabs.Screen name="projects" options={{ headerShown: false, title: "Projects" }} />
      <Tabs.Screen name="search" options={{ headerShown: false, title: "Search" }} />
    </Tabs>
  );
}

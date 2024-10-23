import { router, Slot, Stack, Tabs } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../_layout";

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  if (!authContext?.loggedIn) {
    router.replace("/login");
  }
  return (
    <Stack>
      <Stack.Screen name="home"/>
      <Stack.Screen name="Task" options={{ title: "Tasks" }}/>
    </Stack>
  );
}

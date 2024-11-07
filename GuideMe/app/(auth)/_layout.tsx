import { router, Slot, Stack, Tabs } from "expo-router";
import { auth } from "@/firebase";

export default function TabLayout() {
  const user = auth.currentUser;
  if (!user) {
    router.replace("/login");
  }
  return (
    <Stack>
      <Stack.Screen name="home" options={{title: "GuideMe"}}/>
      <Stack.Screen name="task" options={{ headerTitle: "Tasks" }}/>
    </Stack>
  );
}

import { router, Slot, Stack, Tabs } from "expo-router";
import { auth } from "@/firebase";

export default function TabLayout() {
  const user = auth.currentUser;
  if (!user) {
    router.replace("/login");
  }
  return (
    <Stack>
      <Stack.Screen name="home" options={{title: "GuideMe", headerStyle: { backgroundColor: '#f5f5dc' }}}/>
      <Stack.Screen name="task" options={{ headerTitle: "Tasks", headerStyle: { backgroundColor: '#f5f5dc' }}}/>
      <Stack.Screen name="createProject" options={{title: "Create a Project", headerStyle: { backgroundColor: '#f5f5dc' }}}/>
      <Stack.Screen name="createProjectTwo" options={{ headerTitle: "Create a Project", headerStyle: { backgroundColor: '#f5f5dc' } }}/>
      <Stack.Screen name="createdProject" options={{title: "Create a Project", headerStyle: { backgroundColor: '#f5f5dc' }}}/>
      <Stack.Screen name="newProjectTask" options={{ headerTitle: "New Project Task", headerStyle: { backgroundColor: '#f5f5dc' }}}/>
    </Stack>
  );
}

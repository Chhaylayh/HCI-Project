import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false }}/>
      <Tabs.Screen name="projects" options={{ headerShown: false }}/>
      <Tabs.Screen name="userProfile" options={{ headerShown: false }}/>
    </Tabs>
  );
}
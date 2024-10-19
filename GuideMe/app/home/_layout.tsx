import { router, Tabs } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../_layout';

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  if (!authContext?.loggedIn) {
    router.replace("/login")
  }
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" options={{ headerShown: false }}/>
      <Tabs.Screen name="projects" options={{ headerShown: false }}/>
      <Tabs.Screen name="userProfile" options={{ headerShown: false }}/>
    </Tabs>
  );
}
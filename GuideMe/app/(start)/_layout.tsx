import { router, Stack, Tabs } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../_layout';

export default function TabLayout() {
  const authContext = useContext(AuthContext);
  if (authContext?.loggedIn) {
    router.replace("/home")
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ title: "Log In" }}/>
      <Stack.Screen name="signup" options={{ title: "Sign Up" }}/>
    </Stack>
  );
}
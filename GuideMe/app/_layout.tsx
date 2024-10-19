import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{navigationBarHidden: true}}>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="login" options={{title: "Log In"}}/>
      <Stack.Screen name="signup" options={{title: "Sign Up"}}/>
      <Stack.Screen name="profile" options={{title: "Home"}}/>
    </Stack>
  );
}

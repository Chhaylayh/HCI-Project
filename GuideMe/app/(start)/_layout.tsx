import { auth } from "@/firebase";
import { router, Stack, Tabs } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function TabLayout() {
  onAuthStateChanged(auth, (user)=>{
    if (user) {
      router.replace("/home/dashboard");
    }
  })
    

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    </Stack>
  );
}

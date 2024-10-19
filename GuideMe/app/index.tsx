import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    router.push({ pathname: '/login' });
  };
  const handleSignUp = () => {
    router.push({ pathname: '/signup' });
  };
  const renderButton = (title: string, onPress: () => void, bgColor: string) => (
    <Pressable style={[styles.button, { backgroundColor: bgColor, marginTop: 50 }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuideMe</Text>
      {renderButton("Log In", () => router.push('/login'), "green")}
      {renderButton("Sign Up", () => router.push('/signup'), "red")}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkblue",
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

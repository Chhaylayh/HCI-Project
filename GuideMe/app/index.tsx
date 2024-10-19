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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GuideMe</Text>
      {/* Log In Button */}
      <Pressable style={[styles.logInButton, { marginTop: 150 }]} onPress={handleLogin}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </Pressable>

      {/* Sign Up Button */}
      <Pressable style={[styles.signUpButton, { marginTop: 50 }]} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>
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
  logInButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  signUpButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logInButtonText: {
    color: "darkblue",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

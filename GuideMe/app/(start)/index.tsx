import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../universalStyles";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    router.push({ pathname: '/login' });
  };
  const handleSignUp = () => {
    router.push({ pathname: '/signup' });
  };

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>GuideMe</Text>
      {/* Log In Button */}
      <Pressable style={[localStyles.logInButton, { marginTop: 150 }]} onPress={handleLogin}>
        <Text style={styles.secondaryButtonText}>Log In</Text>
      </Pressable>

      {/* Sign Up Button */}
      <Pressable style={[localStyles.signUpButton, { marginTop: 50 }]} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "darkblue",
    padding: 20,
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
  bottom: {
    marginBottom: 30,
  }
});

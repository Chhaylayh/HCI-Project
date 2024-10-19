import { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple validation
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    // Navigate to profile with the username passed as a parameter
    router.push({
      pathname: '/profile',
      params: { username },
    });
  };
  const handleSignUp = () => {
    router.push({ pathname: '/signup' });
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.title}>Welcome! Please log in.</Text>

      {/* Username Label */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* Password Label */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Log In Button */}
      <Pressable style={styles.logInButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Text style={[styles.label, { marginTop: 50 }]}>Don't have an account? </Text>
      {/* Sign Up Button */}
      <Pressable style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "darkblue", // Light background for the screen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  logInButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  signUpButton: {
    backgroundColor: "red",
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
  bottom: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    color: "white",
  },
});

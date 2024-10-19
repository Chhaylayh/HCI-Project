import { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
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
  const handleLogin = () => {
    router.push({ pathname: '/login' });
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.title}>Get Started.</Text>

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
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Text style={[styles.label, { marginTop: 50 }]}>Already have an account? </Text>
      {/* Sign Up Button */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "darkblue",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    marginBottom: 5,
    color: "darkblue",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderColor: "darkblue",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "darkblue",
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

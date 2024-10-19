import { useState } from "react";
import { Text, View, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./universalStyles";

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
      <Text style={styles.titleBlue}>Get Started.</Text>

      {/* Username Label */}
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* Password Label */}
      <Text style={styles.inputLabel}>Password</Text>
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

      <Text style={[styles.inputLabel, { marginTop: 50 }]}>Already have an account? </Text>
      {/* Sign Up Button */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
    </View>
  );
}
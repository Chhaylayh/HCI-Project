import { useContext, useState } from "react";
import { app } from "@/firebase";
import {
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "../universalStyles";
import { AuthContext } from "../_layout";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const handleLogin = () => {
    // Simple validation
    if (email === "" || password === "" || !email.includes("@")) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const username = user.displayName;
      // Navigate to profile with the username passed as a parameter
      authContext?.setLoggedIn(user);
      /*router.replace({
        pathname: "/home/dashboard",
        params: { username },
      });*/
    })
    .catch(() => {
      Alert.alert("Error", "Please try again");
    });
  };
  const handleSignUp = () => {
    router.push({ pathname: "/signup" });
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.titleBlue}>Welcome! Please log in.</Text>

      {/* Username Label */}
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
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
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Text style={[styles.inputLabel, { marginTop: 50 }]}>
        Don't have an account?{" "}
      </Text>
      {/* Sign Up Button */}
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

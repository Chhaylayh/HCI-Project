import { useState } from "react";
import { auth } from "@/firebase";
import { Text, View, Button, Pressable } from "react-native";
import { styles } from "../universalStyles";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={[styles.pageContainer, styles.beigeBackground, {justifyContent: "space-between"}]}>
      <View style={{marginTop: 50}}>
        <Text style={[styles.titleBlue, { textAlign: "center", fontSize: 36 }]}>Thank you for your contribution!</Text>
        <Text style={[styles.itemText, { textAlign: "center", color: "darkblue", fontSize: 20 }]}>
          Your project is under review! We're excited to publish it soon.
        </Text>
      </View>
      <Pressable
        style={[styles.button, { backgroundColor: "darkblue", marginBottom: 100}]}
        onPress={() => {
          router.replace("/home/project/projects");
        }}
      >
        <Text style={styles.buttonText}>Return Home</Text>
      </Pressable>
    </View>
  );
}

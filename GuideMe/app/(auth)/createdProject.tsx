import { useState } from "react";
import { auth } from "@/firebase";
import { Text, View, Button, Pressable } from "react-native";
import { styles } from "../universalStyles";
import { router } from "expo-router";

export default function Login() {
  return (
    <View style={[styles.pageContainer, {justifyContent: "space-between"}]}>
      <View style={{marginTop: 50}}>
        <Text style={[styles.titleBlue, { textAlign: "center" }]}>Thank you for your contribution!</Text>
        <Text style={[styles.itemText, { textAlign: "center" }]}>
          Your project is under review! We're excited to publish it soon.
        </Text>
      </View>
      <Pressable
        style={[styles.button]}
        onPress={() => {
          router.replace("/home/project/projects");
        }}
      >
        <Text style={styles.buttonText}>Return Home</Text>
      </Pressable>
    </View>
  );
}

import { Button, Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "../universalStyles";

export default function Dashboard() {
  const { username } = useLocalSearchParams();

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.titleBlue}>Welcome, {username}!</Text>
      <Pressable style={[styles.button, { marginTop: 20 }]} onPress={()=>{}}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      <Pressable style={[styles.button, { marginTop: 20 }]} onPress={()=>{router.push('/home/projects')}}>
        <Text style={styles.buttonText}>Projects</Text>
      </Pressable>
    </View>
  );
}
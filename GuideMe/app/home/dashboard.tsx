import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "../universalStyles";

export default function Dashboard() {
  const { username } = useLocalSearchParams();

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.titleBlue}>Welcome, {username}!</Text>
    </View>
  );
}
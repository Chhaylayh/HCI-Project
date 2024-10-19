import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "./universalStyles";

export default function Search() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.titleBlue}>Search</Text>
    </View>
  );
}

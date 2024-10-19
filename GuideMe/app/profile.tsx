import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { username } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Welcome, {username}!</Text>
    </View>
  );
}

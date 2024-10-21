import { View } from "react-native";
import { styles } from "../universalStyles";
import { useLocalSearchParams } from "expo-router";

export default function Task() {
    const { taskId } = useLocalSearchParams();
    return(
    <View style={styles.pageContainer}>
    </View>)
}
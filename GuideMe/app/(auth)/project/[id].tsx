import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../../universalStyles";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import projects from "@/dbMocks/projects";
import { TaskStep } from "@/dbMocks/tasks";

export default function Project() {
  const { id } = useLocalSearchParams();
  const steps : TaskStep[] = projects[id].steps;
  return (
    <>
      <Text>{projects[id].title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {steps.map((step, i) => (
          <View key={i}>
            <Text>{step.title}</Text>
            <Text>{step.description}</Text>
            <Image
              source={{
                uri: step.imageURL,
              }}
              style={styles.imageStyle}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
}

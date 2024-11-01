import { View, Text, Pressable } from "react-native";
import { styles } from "../universalStyles";
import projects from "@/dbMocks/projects";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function Projects() {
  const username = "emma";
  const { app } = useGlobalSearchParams();
  let keys = Object.keys(projects);
  if (app) {
    keys = keys.filter((key) => projects[key].app === app);
  }
  const navToProject = (id : string) => {
    router.push(`/project/${id}`);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleBlue}>Projects</Text>
      {keys.map((key, i) => 
        <Pressable
          style={styles.button}
          onPress={() => navToProject(key)}
          key={i}
        >
          <Text style={styles.buttonText}>
            {projects[key].title}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

import { View, Text, Pressable } from "react-native";
import { styles } from "../../universalStyles";
import users from "@/dbMocks/user"
import projects from "@/dbMocks/projects";
import { router } from "expo-router";

export default function Projects() {
  const username = "emma"

  const continueProject = (id : string) => {
    router.push(`/project/${id}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleBlue}>Projects</Text>
      {users[username].inProgress.length > 0 && 
      <Pressable style={styles.button} onPress={()=>continueProject(users[username].inProgress[0])}>
        <Text style={styles.buttonText}>
          Continue {projects[users[username].inProgress[0]].title}
        </Text>
      </Pressable>}
      <Pressable style={styles.button} onPress={()=>router.push('/browseProjects')}>
        <Text style={styles.buttonText}>
          Start new project
        </Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Create project
        </Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>
          Scoreboard
        </Text>
      </Pressable>
    </View>
  );
}

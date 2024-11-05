import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../../universalStyles";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { TaskStep } from "@/dbMocks/tasks";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";
import { Project as ProjectType } from "@/dbMocks/projects";

export default function Project() {
  const { id } = useLocalSearchParams();
  console.log(id);
  const [project, setProject] = useState<ProjectType>();
  if (!project && typeof id === "string") {
    const docRef = doc(collection(db, "projects"), id);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const data : ProjectType = doc.data() as ProjectType;
        if (data) {
          setProject(data);
        }
      } else {
        console.error("error: project not found");
      }
    });
  }

  return (
    project && (
      <>
        <Text>{project.title}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {project.steps.map((step, i) => (
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
    )
  );
}

import { View, Text, Pressable } from "react-native";
import { type Project, type Projects as ProjectType} from "@/dbMocks/projects";
import { styles } from "../universalStyles";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";

export default function Projects() {
  const username = "emma";
  const { app } = useGlobalSearchParams();
  const [projects, setProjects] = useState<ProjectType>({});
  let querySnapshot;
  if (app) {
    querySnapshot = getDocs(
      query(collection(db, "projects"), where("app", "==", app))
    ).then((result) => { 
      const newData: ProjectType = {};
      result.docs.forEach((doc) => (newData[doc.id]=doc.data() as Project));
      setProjects(newData);         
    });
  } else {
    querySnapshot = getDocs(
      query(collection(db, "projects"))
    ).then((result) => { 
      const newData: ProjectType = {};
      result.docs.forEach((doc) => (newData[doc.id]=doc.data() as Project));
      setProjects(newData);         
    });
  }

  let keys = Object.keys(projects);
  const navToProject = (id: string) => {
    router.push(`/project/${id}`);
  };
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

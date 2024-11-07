import { View, Text, Pressable } from "react-native";
import { type Project, type Projects as ProjectType } from "@/dbMocks/projects";
import { styles } from "../universalStyles";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import users from "@/dbMocks/user";

export default function Projects() {
  const { app } = useGlobalSearchParams();
  const [projects, setProjects] = useState<ProjectType>({});
  let querySnapshot;
  useEffect(() => {
    if (app) {
      querySnapshot = getDocs(
        query(collection(db, "projects"), where("app", "==", app))
      ).then((result) => {
        const newData: ProjectType = {};
        result.docs.forEach((doc) => (newData[doc.id] = doc.data() as Project));
        setProjects(newData);
      });
    } else {
      querySnapshot = getDocs(query(collection(db, "projects"))).then(
        (result) => {
          const newData: ProjectType = {};
          result.docs.forEach(
            (doc) => (newData[doc.id] = doc.data() as Project)
          );
          setProjects(newData);
        }
      );
    }
  });

  let keys = Object.keys(projects);
  const navToProject = (id: string) => {
    // add [id, 0] to database?
    const user = auth.currentUser;
    const userRef = doc(collection(db, "users"), user?.uid);

    // Set the "capital" field of the city 'DC'
    updateDoc(userRef, {
      inProgress: arrayUnion({id:id, step:0})
    });
    router.push(`/project/${id}`);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleBlue}>Projects</Text>
      {keys.map((key, i) => (
        <Pressable
          style={styles.button}
          onPress={() => navToProject(key)}
          key={i}
        >
          <Text style={styles.buttonText}>{projects[key].title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

import { View, Text, Pressable, ScrollView } from "react-native";
import { type Project, type Projects as ProjectType } from "@/dbMocks/projects";
import { styles } from "../../../universalStyles";
import { router, useGlobalSearchParams } from "expo-router";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";

export default function Projects() {
  const { app } = useGlobalSearchParams();
  const [projects, setProjects] = useState<ProjectType>({});
  const [finishedProjectIds, setFinishedProjectIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let result;

      if (app && app !== "all") {
        result = await getDocs(
          query(collection(db, "projects"), where("app", "==", app))
        );
      } else {
        result = await getDocs(collection(db, "projects"));
      }

      const newData: ProjectType = {};
      result.docs.forEach((doc) => {
        newData[doc.id] = doc.data() as Project;
      });
      setProjects(newData);
    };

    const fetchUserFinishedProjects = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(collection(db, "users"), user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const finishedProjects = userData.finishedProjects || [];
          // fetch the finishedProjects and store them in map for filtering. ZO
          setFinishedProjectIds(finishedProjects.map((p: { id: string }) => p.id));
        }
      }
    };

    fetchProjects();
    fetchUserFinishedProjects();
  }, [app]);

  // filter out finished projects from projects list. ZO
  const filteredProjects = Object.keys(projects).filter(
    (key) => !finishedProjectIds.includes(key) && projects[key].published
  );

  const navToProject = (id: string) => {
    // add [id, 0] to database?
    const user = auth.currentUser;
    const userRef = doc(collection(db, "users"), user?.uid);

    // Set the "capital" field of the city 'DC'
    updateDoc(userRef, {
      inProgress: arrayUnion({ id: id, step: 0 }),
    });
    router.push(`/home/project/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titleBlue, {textAlign: "center"}]}>Projects {app ? "for "+ app : ""}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredProjects.length > 0 ? filteredProjects.map((key, i) => (
          <Pressable
            style={[styles.button, {marginVertical: 10}]}
            onPress={() => navToProject(key)}
            key={i}
          >
            <Text style={styles.buttonText}>{projects[key].title}</Text>
          </Pressable>
        )) : <Text style={styles.itemText}>You've completed all the projects for this app! Congratulations!</Text>}
      </ScrollView>
    </View>
  );
}

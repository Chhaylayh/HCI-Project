import { View, Text, Pressable, ScrollView, Image } from "react-native";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
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
      setLoading(true);
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
      setLoading(false);
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
  const getAppImage = (appName: string) => {
    const appImages: { [key: string]: string } = {
      "VS Code": 'https://tidalcycles.org/assets/images/vscodeicon-42dc264fde2adb74cc197fe6d02b183c.png',
      "ChatGPT": 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png',
      "Discord": 'https://static.vecteezy.com/system/resources/previews/023/741/066/non_2x/discord-logo-icon-social-media-icon-free-png.png',
      "Microsoft Excel": 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png', 
    };
    return appImages[appName];
  };

  return (
    <View style={[styles.pageContainer, styles.beigeBackground]}>
      <Text style={[styles.titleBlue, {textAlign: "center"}]}>Projects {(app && app !== "all") ? "for "+ app : ""}</Text>
      {!loading ? <ScrollView contentContainerStyle={styles.scrollContainer}>
        {( filteredProjects.length > 0) ? filteredProjects.map((key, i) => (
          <Pressable
            style={[styles.button, {marginVertical: 10, flexDirection: "row", alignItems: "center", padding: 10,}]}
            onPress={() => navToProject(key)}
            key={i}
          >
            <Image
              source={{ uri: getAppImage(projects[key].app) }}
              style={{ width: 50, height: 50, marginRight: 15 }}
              resizeMode="contain"
            />
            <Text style={[styles.buttonText, { flex: 1 }]}>
              {projects[key].title}
            </Text>
          </Pressable>
        )) : <Text style={styles.itemText}>You've completed all the projects for this app! Congratulations!</Text>}
      </ScrollView> : null}
    </View>
  );
}

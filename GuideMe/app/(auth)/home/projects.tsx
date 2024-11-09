import { View, Text, Pressable } from "react-native";
import { styles } from "../../universalStyles";
import users from "@/dbMocks/user";
import projects from "@/dbMocks/projects";
import { router } from "expo-router";
import { Project as ProjectType } from "@/dbMocks/projects";
import { collection, doc, getDoc, getDocs, limit, query, setDoc, where, } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useContext, useEffect, useState } from "react";

export default function Projects() {
  const user = auth.currentUser;
  const username = user?.email?.split("@")[0] || "";
  const [inProgress, setInProgress] = useState<string[][]>([]);
  
  useEffect(() => {
    if (user?.uid) {
      const docRef = doc(collection(db, "users"), user?.uid);
      getDoc(docRef).then((uDoc) => {
        if (uDoc.exists()) {
          const data = uDoc.data();
          console.log(inProgress);
          const projectRef = doc(
            collection(db, "projects"),
            typeof data.inProgress[0] === "string" ? data.inProgress[0] : data.inProgress[0].id
          );
          getDoc(projectRef).then((pDoc) => {
            if (pDoc.exists()) {
              const pData: ProjectType = pDoc.data() as ProjectType;
              if (pData) {
                setInProgress([...inProgress, [pData.title, typeof data.inProgress[0] === "string" ? data.inProgress[0] : data.inProgress[0].id]]);
              }
            } else {
              console.error("error: project not found");
            }
          });
        } else {
          console.error("error: user not found");
        }
      });
    }
  }, [user]);

  const continueProject = (id: string) => {
    router.push(`/project/${id}`);
  };

  const createProject = async () => {
    const docRef = await setDoc(doc(collection(db, "projects")), {
      app: "VS Code",
      author: user?.uid,
      title: "hello",
      steps: [
        {
          title: "start",
          description: "sign up",
          imageURL:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fen.opensuse.org%2Fimages%2Fa%2Fa8%2FVS_Code_screenshot.png&f=1&nofb=1&ipt=ca1d56bb9cd0fe1585b88221fa54be2cedac4a0bc76a2eddb49168e683468944&ipo=images",
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titleBlue, { fontWeight: 'bold', fontSize: 36 }]}>Project</Text>

      {inProgress.length > 0 && (
        <Pressable
          style={styles.button}
          onPress={() => continueProject(inProgress[0][1])}
        >
          <Text style={styles.buttonText}>Continue {inProgress[0][0]}</Text>
        </Pressable>
      )}
      
      <Pressable
        style={styles.button}
        onPress={() => router.push("/browseProjects")}
      >
        <Text style={styles.buttonText}>Start new project</Text>
      </Pressable>
      
      <Pressable  style={styles.button} onPress={() => router.push("/createProject")} >
        <Text style={styles.buttonText}>Create project</Text>
      </Pressable>
      
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Scoreboard</Text>
      </Pressable>

    </View>
  );
}

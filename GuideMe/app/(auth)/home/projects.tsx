import { View, Text, Pressable } from "react-native";
import { styles } from "../../universalStyles";
import users from "@/dbMocks/user"
import projects from "@/dbMocks/projects";
import { router } from "expo-router";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { AuthContext } from "@/app/_layout";
import { useContext, useState } from "react";

export default function Projects() {
  const authContext = useContext(AuthContext);
  const username = authContext?.loggedIn?.email?.split("@")[0] || "";
  const [inProgress, setInProgress] = useState<string[]>([]);
  if (inProgress.length === 0 && authContext?.loggedIn?.uid) {
    const docRef = doc(collection(db, "users"), authContext?.loggedIn?.uid);
    getDoc(docRef).then((doc)=>{
      if (doc.exists()) {
        const data = doc.data()
        console.log("Document data:", data);
        if (doc.data()) {
          console.log(doc.data().inProgress)
          setInProgress(doc.data().inProgress);
        }
        
      } else {
        console.error("error: user not found");
      }
    });
    
  }

  const continueProject = (id : string) => {
    router.push(`/project/${id}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleBlue}>Projects</Text>
      {inProgress.length > 0 && 
      <Pressable style={styles.button} onPress={()=>continueProject(inProgress[0])}>
        <Text style={styles.buttonText}>
          Continue {projects[inProgress[0]].title}
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

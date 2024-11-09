import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { styles } from "../../../universalStyles";
import { useGlobalSearchParams, useLocalSearchParams, router } from "expo-router";
import { TaskStep } from "@/dbMocks/tasks";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import { Project as ProjectType } from "@/dbMocks/projects";

export default function Project() {
  const [isFull, setIsFull] = useState(false);

  const { id } = useLocalSearchParams();
  console.log(id);
  const [project, setProject] = useState<ProjectType>();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // track the current step. ZO

  useEffect(() => {
    if (!project && typeof id === "string") {
      const docRef = doc(collection(db, "projects"), id);
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          const data: ProjectType = doc.data() as ProjectType;
          if (data) {
            setProject(data);
          }
        } else {
          console.error("error: project not found");
        }
      });
    }
  });
  const toggleStatus = async () => {
    if (project) {
      const user = auth.currentUser; // get user. ZO
      if (!user) return;

      // find the specific in-progress project in the user's data. ZO
      const userRef = doc(collection(db, "users"), user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.inProgress) {
          // locate the project in the inProgress array. ZO
          const updatedInProgress = userData.inProgress.map((p: ProjectType) => {
            if (p.title === project.title) {
              const updatedStep = [...p.steps];
              const currentStep = updatedStep[currentStepIndex];
              currentStep.completed = !currentStep.completed; // toggle current step's completion. ZO
              return { ...p, steps: updatedStep }; // return project with modified step. ZO
            }
            return p;
          });

          await updateDoc(userRef, { // update the user's inProgress project array in firestore. ZO
            inProgress: updatedInProgress,
          });
        }
      }
    }
  };
  const handleNextStep = () => {
    if (project && project.steps && currentStepIndex < project.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1); // move to next step if it exists. ZO
    } else {
      finishProject();
    }
  };
  const finishProject = async () => {
    const user = auth.currentUser;
    const userRef = doc(collection(db, "users"), user?.uid);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
  
        // check if user has finishedProjects and append the current project. ZO
        const updatedFinishedProjects = userData?.finishedProjects ? [...userData.finishedProjects, project] : [project];
  
        await updateDoc(userRef, {
          inProgress: [],
          finishedProjects: updatedFinishedProjects,
        });
      router.push("/home");
      }
    } catch (error) {
      console.error("Error finishing project:", error);
    }
  };

  return (
    project && (
      <View style={styles.pageContainer}>
        <Text style={[styles.titleBlue, { color: "black", textAlign: "center", fontSize: 50 }]}>{project.title}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View key={currentStepIndex} style={[styles.stepContainer, { alignItems: "stretch"}]}>
              <Text style={[styles.buttonText, { color: "black", textAlign: "center", fontSize: 30, textDecorationLine: "underline" }]}>{project.steps[currentStepIndex].title}</Text>
              <Text style={[styles.buttonText, { color: "black", textAlign: "center", fontSize: 20, fontWeight: 300 }]}>{project.steps[currentStepIndex].description}</Text>
              {project.steps[currentStepIndex].imageURL && (
                <Image source={{ uri: project.steps[currentStepIndex].imageURL }} style={styles.imageStyle} />
              )}
              <Pressable style={[styles.buttonLarge, { marginTop: 50, width: 360 }]} onPress={() => {toggleStatus()}}>
                <Text style={styles.buttonText}>{project.steps[currentStepIndex].completed ? "Mark as Complete" : "Completed"}</Text>
              </Pressable>
              <View style={styles.rowContainer}>
                <Pressable style={[styles.buttonLarge, { marginTop: 10, marginRight: 60, width: 150}]} onPress={() => {router.push("/home")}}>
                  <Text style={styles.buttonText}>Home</Text>
                </Pressable>
                <Pressable style={[styles.buttonLarge, { marginTop: 10, width: 150 }]} onPress={() => {handleNextStep()}}>
                  <Text style={styles.buttonText}> {currentStepIndex === project.steps.length - 1 ? "Finish Project" : "Next Step"}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
      </View>
    )
  );
}

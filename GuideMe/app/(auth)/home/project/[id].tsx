import { View, Text, Image, ScrollView, Pressable, Alert } from "react-native";
import { styles } from "../../../universalStyles";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  router,
} from "expo-router";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useEffect, useState } from "react";
import { Project as ProjectType } from "@/dbMocks/projects";

export default function Project() {
  const [project, setProject] = useState<ProjectType>();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // track the user's currentStep. ZO
  const { id } = useLocalSearchParams();
  const [stepCompleted, setStepCompleted] = useState(false); // Mark as Complete local boolean. ZO

  useEffect(() => {
    const fetchProjectData = async () => {
      if (typeof id === "string") {
        const docRef = doc(collection(db, "projects"), id);
        const projectDoc = await getDoc(docRef);

        if (projectDoc.exists()) {
          const data: ProjectType = projectDoc.data() as ProjectType;
          setProject(data);

          const user = auth.currentUser;
          if (user) {
            const userRef = doc(collection(db, "users"), user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              const userProgress = userData.inProgress.find(
                (p: { id: string }) => p.id === id
              );

              // set currentStepIndex to last completed step. ZO
              setCurrentStepIndex(userProgress?.step || 0);
            }
          }
        } else {
          // console.error("Project not found");
        }
      }
    };

    fetchProjectData();
  }, [id]);

  const toggleStatus = async () => {
    if (project) {
      const user = auth.currentUser;
      if (!user) return;

      if (currentStepIndex >= project.steps.length - 1) {
        setStepCompleted(true);
        return; // exit early to avoid incrementing beyond available steps. ZO
      }

      const userRef = doc(collection(db, "users"), user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.inProgress) {
          const updatedInProgress = userData.inProgress.map(
            (p: { id: string; step: number }) => {
              if (p.id === id) {
                return { ...p, step: currentStepIndex + 1 };
              } // update the current step + 1 when you Mark as Complete. ZO
              return p;
            }
          );

          await updateDoc(userRef, { inProgress: updatedInProgress });
          setStepCompleted(true);
        }
      }
    }
  };

  const handleNextStep = async () => {
    const user = auth.currentUser;
    if (!user || !project) return;

    const userRef = doc(collection(db, "users"), user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const userProgress = userData?.inProgress.find(
        (p: { id: string }) => p.id === id
      );

      if (
        currentStepIndex >= project.steps.length - 1 &&
        stepCompleted == true
      ) {
        finishProject(); // finish project on last, completed step. ZO
      } else if (userProgress && userProgress.step > currentStepIndex) {
        setCurrentStepIndex((prevIndex) => prevIndex + 1); // else move to next step. ZO
        setStepCompleted(false);
      } else {
        console.warn("Step not marked as complete");
      }
    }
  };
  const handlePreviousStep = async () => {
    if (currentStepIndex > 0) {
      const user = auth.currentUser;
      if (!user || !project) return;

      const userRef = doc(collection(db, "users"), user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedInProgress = userData?.inProgress.map((p: { id: string, step: number }) => {
          if (p.id === id) {
            return { ...p, step: currentStepIndex - 1 };
          }
          return p;
        });

        await updateDoc(userRef, { inProgress: updatedInProgress });
        setCurrentStepIndex((prevIndex) => prevIndex - 1);
        setStepCompleted(false);
      }
    }
  };
  const finishProject = async () => {
    const user = auth.currentUser;
    const userRef = doc(collection(db, "users"), user?.uid);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // check if finishedProject already exists. if so, do not add duplicate. ZO
        const isAlreadyFinished = userData?.finishedProjects?.some(
          (p: { id: string }) => p.id === id
        );
        const updatedFinishedProjects = isAlreadyFinished
          ? userData.finishedProjects
          : [...(userData.finishedProjects || []), { id }]; // find finishedProjects and add project id. ZO

        const updatedInProgress = userData?.inProgress?.filter(
          (p: { id: string }) => p.id !== id
        ); // remove the project from inProgress. ZO

        await updateDoc(userRef, {
          inProgress: updatedInProgress,
          finishedProjects: updatedFinishedProjects,
        });
        router.push("/");
      }
    } catch (error) {
      //console.error("Error finishing project:", error);
    }
  };

  if (project && project?.steps.length < 1) {
    Alert.alert("Project not found");
    router.back();
  } else return (
    project && (
      <View style={[styles.pageContainer, styles.beigeBackground]}>
        <Text style={[styles.titleBlue, { color: "darkblue", textAlign: "center"}]}>Project: {project.title}</Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View key={currentStepIndex} style={[styles.stepContainer, { alignItems: "stretch" }]}>
            <Text style={[styles.buttonText, { color: "darkblue", textAlign: "center", fontSize: 30, textDecorationLine: "underline" }]}>Step {currentStepIndex + 1}: {project.steps[currentStepIndex].title}</Text>
            <Text style={[styles.buttonText, { color: "darkblue", textAlign: "center", fontSize: 20, fontWeight: "300" }]}>{project.steps[currentStepIndex].description}</Text>
            {project.steps[currentStepIndex].imageURL && (
              <Image source={{ uri: project.steps[currentStepIndex].imageURL }} style={styles.imageStyle} />
            )}
    
            
              
            </View>
        </ScrollView>
        <Pressable style={[styles.buttonLarge, { marginTop: 10, width: "100%", backgroundColor: stepCompleted ? "green" : "#f28b82", }]} onPress={toggleStatus}>
              <Text style={styles.buttonText}>
                {stepCompleted
                ? `Step ${currentStepIndex + 1} of ${project.steps.length} Completed`
                : `Mark Step ${currentStepIndex + 1} of ${project.steps.length} as Complete`}
              </Text>
            </Pressable>
        <View style={[styles.rowContainer, {justifyContent: "space-between", marginVertical: 10, maxHeight: 60}]}>
        
                  <Pressable
                    style={[
                      styles.buttonLarge,
                      {
                        flex: 1,
                        marginRight: 5,
                        backgroundColor:"darkblue"
                      },
                    ]} // grey out until complete. ZO
                    disabled={currentStepIndex===0}
                    onPress={handlePreviousStep}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </Pressable>
                
                <Pressable
                  style={[
                    styles.buttonLarge,
                    {
                      flex: 1,
                      marginLeft: 5,
                      backgroundColor: stepCompleted ? "darkblue" : "#CCCCCC",
                    },
                  ]} // grey out until complete. ZO
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}>
                    {currentStepIndex === project.steps.length - 1
                      ? "Finish Project"
                      : "Next Step"}
                  </Text>
                </Pressable>
              </View>
        <Pressable style={[styles.buttonLarge, {width: "100%", backgroundColor: "darkblue" }]} onPress={() => router.push("/")}> 
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
      </View>
    )
  );
}

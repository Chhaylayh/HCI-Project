import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import { TaskStep } from "@/dbMocks/tasks";
import { useIsFocused } from "@react-navigation/native";
import { styles } from "../universalStyles";

const CreateProjectTwo = () => {
  // const route = useRoute();
  const { projectId: initialProjectId } = useLocalSearchParams();
  const [projectName, setProjectName] = useState("");
  const [steps, setSteps] = useState<TaskStep[]>([]);
  //const isFocused = useIsFocused(); // Hook to know when the screen is focused

  /*useEffect(() => {
    if (isFocused) {
      fetchProjectData();
    }
  }, [isFocused, initialProjectId]);*/

  useFocusEffect(useCallback(()=>{
    fetchProjectData();
  }, []));

  const fetchProjectData = async () => {
    try {
      const projectRef = doc(collection(db, "draftProjects"), initialProjectId);
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        setProjectName(projectData.title || "Untitled Project");
        setSteps(projectData.steps);
      } else {
        console.error("Project not found");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleCreateProject = async () => {
    if (!steps || steps.length === 0) {
      Alert.alert("Add Steps", "Please add at least one step to proceed.");
      return;
    }

    try {
      // Navigate to the next screen or confirm project creation
      router.replace("/createdProject");
    } catch (error) {
      console.error("Error finalizing project:", error);
    }
  };

  const handleAddTask = () => {
    router.push({
      pathname: "/newProjectTask",
      params: { projectId: initialProjectId },
    });
  };

  const handleEditTask = (step, index) => {
    router.push({
      pathname: "/newProjectTask",
      params: {
        projectId: initialProjectId,
        title: step.title,
        description: step.description,
        imageURL: step.imageURL,
        taskIndex: index,
      },
    });
  };

  const taskPairs = [];
  if (steps) {
    for (let i = 0; i < steps.length; i += 2) {
      taskPairs.push(steps.slice(i, i + 2));
    }
  }

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      console.log(e.data.action.type);
      if (e.data.action.type === "POP" || e.data.action.type === "GO_BACK") {
        e.preventDefault();
        Alert.alert(
          "Are you sure you want to leave this page without submitting?",
          "You could lose your progress",
          [
            { text: "Cancel", style: "cancel", onPress: () => {} },
            {
              text: "Leave",
              style: "destructive",
              onPress: () => {
                navigation.dispatch(e.data.action);
              },
            },
          ]
        );
        
      }
    });
    return unsubscribe;
  });

  return (
    <ScrollView style={[localStyles.scrollView]}>
      <View style={[localStyles.container]}>
        <View style={[localStyles.header]}>
          <Text style={styles.titleBlue}>{projectName}</Text>
          </View>
        {taskPairs.length === 0 ? <Text style={[styles.buttonTextLight, { color: "darkblue", marginBottom: 10}]}>Click the + Button to add the first step to your project!</Text> : <Text style={[styles.buttonText, {marginTop: 10, marginBottom: 10, color: "darkblue"}]}>Current Steps</Text>
        }
        <View style={localStyles.taskContainer}>
          {taskPairs.map((pair, rowIndex) => (
            <View key={rowIndex} style={localStyles.taskRow}>
              {pair.map((step, i) => (
                <Pressable
                  key={i}
                  style={localStyles.taskButton}
                  onPress={() => handleEditTask(step, rowIndex * 2 + i)}
                >
                  <View style={localStyles.taskButtonContent}>
                    <Text style={localStyles.taskButtonText}>{step.title}</Text>
                  </View>
                </Pressable>
              ))}
              
            </View>
          ))}

          <Pressable style={[localStyles.addButton, {backgroundColor: taskPairs.length > 0 ? "white" : "darkblue"}]} onPress={handleAddTask}>
            <Text style={[localStyles.addButtonText, {color: taskPairs.length > 0 ? "darkblue" : "white"}]}>+</Text>
          </Pressable>
        </View>

        <View style={localStyles.footer}>
          <Pressable
            style={[
              localStyles.publishButton,
              {
                backgroundColor:
                  steps && steps.length > 0 ? "#0E0A68" : "#CCCCCC", // Gray out if disabled
              },
            ]}
            onPress={handleCreateProject}
            disabled={!(steps && steps.length > 0)}
          >
            <Text style={localStyles.publishButtonText}>Publish Project </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get("window").width;
const taskButtonSize = (windowWidth - 60) / 2;

const localStyles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5dc",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  taskContainer: {
    flex: 1,
    gap: 12,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  taskButton: {
    width: taskButtonSize,
    height: taskButtonSize,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  taskButtonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  emptyTask: {
    backgroundColor: "transparent",
  },
  taskButtonText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 28,
    width: "100%",
  },
  addButton: {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
  },
  addButtonText: {
    fontSize: 40,
    color: "#000",
  },
  footer: {
    marginTop: "auto",
    paddingVertical: 20,
  },
  publishButton: {
    backgroundColor: "darkblue",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateProjectTwo;

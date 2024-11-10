import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { router } from "expo-router";
import { TaskStep } from "@/dbMocks/tasks";
import { styles } from "../universalStyles";

const CreateProjectTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId: initialProjectId } = route.params;
  const [projectName, setProjectName] = useState("");
  const [steps, setSteps] = useState<TaskStep[]>();
  const user = auth.currentUser;

  useEffect(() => {
    const projectRef = doc(collection(db, "projects"), initialProjectId);
    getDoc(projectRef).then((pDoc) => {
      if (pDoc.exists()) {
        setProjectName(pDoc.data().projectName);
        setSteps(pDoc.data().steps);
      } else {
        console.error("error: project not found");
      }
    });
  });

  const handleCreateProject = async () => {
    if (!steps) {
      return;
    }
    try {
      Alert.alert("Success", "Project created successfully!");
      router.push("createdProject"); // Navigate back to projects page
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleAddTask = () => {
    router.push({pathname: "/newProjectTask", params: { projectId: initialProjectId }});
  };

  const taskPairs = [];
  if (steps) {
    for (let i = 0; i < steps.length; i += 2) {
      taskPairs.push(steps.slice(i, i + 2));
    }
  }

  return (
    <ScrollView style={[localStyles.scrollView, styles.beigeBackground]}>
      <View style={[localStyles.container, styles.beigeBackground]}>
        <View style={[localStyles.header, styles.beigeBackground]}>
          <Pressable onPress={() => router.back()} style={localStyles.backButton}>
            <Text style={localStyles.backButtonText}>‹ Back</Text>
          </Pressable>
          <Text style={[localStyles.title, { fontSize: 36, textAlign: "center"}]}>Write a Short Story with ChatGPT</Text>
        </View>

        <View style={localStyles.taskContainer}>
          {taskPairs.map((pair, rowIndex) => (
            <View key={rowIndex} style={localStyles.taskRow}>
              {pair.map((step, i) => (
                <Pressable
                  key={i}
                  style={localStyles.taskButton}
                  onPress={() =>
                    router.push({
                      pathname: "/newProjectTask",
                      params: { projectId: initialProjectId },
                    })
                  } // Navigate to the corresponding route
                >
                  <View style={localStyles.taskButtonContent}>
                    <Text style={localStyles.taskButtonText}>{step.title}</Text>
                  </View>
                </Pressable>
              ))}
              {/* Add empty space if the row has only one item */}
              {pair.length === 1 && (
                <View style={[localStyles.taskButton, localStyles.emptyTask]} />
              )}
            </View>
          ))}

          <Pressable style={localStyles.addButton} onPress={handleAddTask}>
            <Text style={localStyles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <View style={localStyles.footer}>
          <Pressable style={localStyles.publishButton} onPress={handleCreateProject}>
            <Text style={localStyles.publishButtonText}>Publish Project →</Text>
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "darkblue",
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
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 12,
  },
  addButtonText: {
    fontSize: 24,
    color: "#666",
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

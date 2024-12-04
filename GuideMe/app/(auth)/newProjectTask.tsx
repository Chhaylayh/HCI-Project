import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../universalStyles";

const NewProjectTask = () => {
  const { projectId, title, description, imageURL, taskIndex } =
    useLocalSearchParams();
  const [steps, setSteps] = useState(
    title
      ? { title: title, description: description, imageURL: imageURL }
      : { title: "", description: "", imageURL: "" }
  );
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [tempDescription, setTempDescription] = useState("");

  const updateStep = (
    key: "description" | "title" | "imageURL",
    value: string
  ) => {
    const updatedStep = { ...steps };
    updatedStep[key] = value;
    setSteps(updatedStep);
  };

  const openDescriptionModal = () => {
    setTempDescription(steps.description);
    setDescriptionModalVisible(true);
  };

  const saveDescription = () => {
    updateStep("description", tempDescription);
    setDescriptionModalVisible(false);
  };

  const handleCreateTask = async () => {
    if (steps.title == "" || steps.description == "") {
      alert(
        `Please add a ${
          steps.title === "" ? "title" : "description"
        } before submitting your task.`
      );
    } else {
      try {
        const projectRef = doc(collection(db, "draftProjects"), projectId);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
          const projectData = projectDoc.data();
          let updatedSteps = projectData.steps || [];

          if (taskIndex !== undefined) {
            // Update existing task
            updatedSteps[taskIndex] = steps;
          } else {
            // Add new task
            updatedSteps.push(steps);
          }

          // Update Firestore
          await updateDoc(projectRef, { steps: updatedSteps });

          Alert.alert(
            "Success",
            taskIndex !== undefined
              ? "Task updated successfully!"
              : "Task created successfully!"
          );
        } else {
          console.error("Error: Project not found.");
        }
      } catch (error) {
        console.error("Error creating or updating task:", error);
      }
    }
  };

  const addImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync();
    if (!image.canceled) {
      updateStep("imageURL", image.assets[0].fileName || "Added an Image");
    } else {
      Alert.alert("You did not select an image. Please try again.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        localStyles.container,
        styles.beigeBackground,
        { justifyContent: "center", flexGrow: 1 },
      ]}
    >
      <Text
        style={[
          localStyles.header,
          styles.beigeBackground,
          { textAlign: "center" },
        ]}
      >
        {title ? "Edit Project Task" : "New Project Task"}
      </Text>

      {steps && (
        <View style={[localStyles.stepContainer, styles.beigeBackground]}>
          <Text style={localStyles.label}>Title:</Text>

          <TextInput
            style={localStyles.textInput}
            value={steps.title}
            onChangeText={(text) => updateStep("title", text)}
            placeholder="Step title"
          />

          <Text style={localStyles.label}>Description:</Text>

          <Pressable
            onPress={openDescriptionModal}
            style={localStyles.pressableInput}
          >
            <Text style={localStyles.descriptionText}>
              {steps.description || "Add a description"}
            </Text>
          </Pressable>

          <Pressable
            style={[localStyles.imageButton, { backgroundColor: "white" }]}
            onPress={addImage}
          >
            <Ionicons name="image-outline" size={20} color="blue" />

            <Text style={localStyles.imageButtonText}>
              {steps.imageURL
                ? steps.imageURL.substring(0, 40)
                : "Add an image"}
            </Text>
          </Pressable>
        </View>
      )}

      <Pressable
        style={[localStyles.createButton, { backgroundColor: "darkblue" }]}
        onPress={handleCreateTask}
      >
        <Text style={localStyles.createButtonText}>
          {title ? "Update Task" : "Create Task"}
        </Text>
      </Pressable>

      <Modal
        visible={descriptionModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDescriptionModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={localStyles.modalContainer}
        >
          <View style={localStyles.modalContent}>
            <Text style={localStyles.modalHeader}>Enter Description</Text>
            <TextInput
              style={localStyles.modalInput}
              value={tempDescription}
              onChangeText={setTempDescription}
              placeholder="Add a description"
              multiline={true}
              autoFocus={true}
            />
            <Pressable style={localStyles.saveButton} onPress={saveDescription}>
              <Text style={localStyles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  pressableInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 10,
    height: 150,
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
    textAlignVertical: "top",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "darkblue",
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: "darkblue",
  },
  stepContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  imageButtonText: {
    marginLeft: 10,
    color: "blue",
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#0000b0",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#0000b0",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default NewProjectTask;

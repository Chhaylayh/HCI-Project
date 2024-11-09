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
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute, useNavigation } from "@react-navigation/native";

const NewProjectTask = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params;
  const [taskTitle, setTaskTitle] = useState("");
  const [steps, setSteps] = useState([
    { title: "", description: "", image: null },
  ]);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [tempDescription, setTempDescription] = useState("");

  const addStep = () => {
    setSteps([...steps, { title: "", description: "", image: null }]);
  };

  const updateStep = (index, key, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][key] = value;
    setSteps(updatedSteps);
  };

  const openDescriptionModal = (index) => {
    setCurrentStepIndex(index);
    setTempDescription(steps[index].description);
    setDescriptionModalVisible(true);
  };

  const saveDescription = () => {
    if (currentStepIndex !== null) {
      updateStep(currentStepIndex, "description", tempDescription);
    }
    setDescriptionModalVisible(false);
  };

  const handleCreateTask = async () => {
    if (!taskTitle.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    try {
      const taskDoc = await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        steps,
        projectId,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Task created successfully!");
      navigation.goBack(); // Go back to CreateProjectTwo
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Error", "Failed to create task");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New Project Task</Text>
      <Text style={styles.label}>Task Title:</Text>
      <TextInput
        style={styles.input}
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder="Create an Account"
      />

      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Step {index + 1}:</Text>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={step.title}
            onChangeText={(text) => updateStep(index, "title", text)}
            placeholder="Step title"
          />
          <Text style={styles.label}>Description:</Text>
          <Pressable
            onPress={() => openDescriptionModal(index)}
            style={styles.pressableInput}
          >
            <TextInput
              style={styles.input}
              value={step.description}
              placeholder="Add a description"
              editable={false}
              pointerEvents="none"
            />
          </Pressable>

          <Pressable
            style={styles.imageButton}
            onPress={() =>
              Alert.alert(
                "Add Image",
                "Feature to add an image will be implemented here."
              )
            }
          >
            <Ionicons name="image-outline" size={20} color="blue" />
            <Text style={styles.imageButtonText}>
              {step.image ? "Screenshot.png" : "Add an image"}
            </Text>
          </Pressable>
        </View>
      ))}

      <Pressable style={styles.createButton} onPress={handleCreateTask}>
        <Text style={styles.createButtonText}>Create Task</Text>
      </Pressable>

      <Modal
  visible={descriptionModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setDescriptionModalVisible(false)}
>
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.modalContainer}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalHeader}>Enter Description</Text>
      <TextInput
        style={styles.modalInput}
        value={tempDescription}
        onChangeText={setTempDescription}
        placeholder="Add a description"
        multiline={true}
        autoFocus={true} 
      />
      <Pressable style={styles.saveButton} onPress={saveDescription}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </View>
  </KeyboardAvoidingView>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  pressableInput: {
    ...StyleSheet.flatten([this.input]),
    backgroundColor: "transparent",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  stepContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%', 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    minHeight: 100, 
    borderWidth: 1,
    borderColor: '#0000b0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0000b0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewProjectTask;

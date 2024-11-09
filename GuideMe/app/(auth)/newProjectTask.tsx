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
import { collection, addDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import { useRoute, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const NewProjectTask = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params;
  const [steps, setSteps] = useState({ title: "", description: "", imageURL: "" });
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [tempDescription, setTempDescription] = useState("");


  const updateStep = (key: "description" | "title" | "imageURL", value: string) => {
    const updatedStep = {...steps};
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
    // Add the project to Firestore
    await updateDoc(doc(collection(db, 'projects'), projectId), {
      steps: arrayUnion(steps)
    });
    router.back();
  };

  const addImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync()
    if (!image.canceled) {
      updateStep("imageURL", image.assets[0].fileName || "Added an Image")
    } else {
      Alert.alert("You did not select an image. Please try again.");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>New Project Task</Text>

      {steps && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={steps.title}
            onChangeText={(text) => updateStep("title", text)}
            placeholder="Step title"
          />
          <Text style={styles.label}>Description:</Text>
          <Pressable
            onPress={() => openDescriptionModal()}
            style={styles.pressableInput}
          >
            <TextInput
              style={styles.input}
              value={steps.description}
              placeholder="Add a description"
              editable={false}
              pointerEvents="none"
            />
          </Pressable>

          <Pressable
            style={styles.imageButton}
            onPress={() => addImage()}
          >
            <Ionicons name="image-outline" size={20} color="blue" />
            <Text style={styles.imageButtonText}>
              {steps.imageURL ? steps.imageURL.substring(0, 40) : "Add an image"}
            </Text>
          </Pressable>
        </View>
      )}

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

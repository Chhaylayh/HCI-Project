import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { collection, addDoc, doc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { styles } from "../universalStyles";

export default function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [selectedApp, setSelectedApp] = useState("ChatGPT"); // Default to ChatGPT
  const [projectType, setProjectType] = useState("Project"); // Default to "Project"
  const user = auth.currentUser;

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      Alert.alert("Error", "Please enter a project name");
      return;
    }

    try {
      // Add the project to Firestore
      addDoc(collection(db, "projects"), {
        app: selectedApp,
        author: user?.uid,
        title: projectName,
        date: new Date().getTime(),
        published: false,
        steps: [],
      }).then((result)=>{
        Alert.alert("Success", "Now you can add steps to your project");
        router.push({pathname: "/createProjectTwo", params:{projectId: result.id}});
      });

      
    } catch (error) {
      console.error("Error creating project:", error);
      Alert.alert("Error", "Failed to create project");
    }
  };

    return (
        <View style={[localStyles.container, styles.beigeBackground]}>

      <Text style={localStyles.title}>Create a Project</Text>

      <Text style={localStyles.label}>Project Name:</Text>
      <TextInput
        style={[localStyles.input, {backgroundColor: "white"}]}
        placeholder="Write a Short Story with ChatGPT"
        value={projectName}
        onChangeText={setProjectName}
      />

      <Text style={localStyles.label}>Relevant App</Text>
      <View style={localStyles.pickerContainer}>
        <Picker
          selectedValue={selectedApp}
          onValueChange={(itemValue) => setSelectedApp(itemValue)}
          style={localStyles.picker}
          mode="dropdown"
        >
          <Picker.Item label="ChatGPT" value="ChatGPT" />
          <Picker.Item label="VS Code" value="VS Code" />
          <Picker.Item label="Microsoft Excel" value="Microsoft Excel" />
          <Picker.Item label="Discord" value="Discord" />
          <Picker.Item label="Microsoft Teams" value="Microsoft Teams" />
        </Picker>
      </View>

      <Text style={localStyles.label}>Project Type</Text>
      <View style={localStyles.pickerContainer}>
        <Picker
          selectedValue={projectType}
          onValueChange={(itemValue) => setProjectType(itemValue)}
          style={localStyles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Project" value="Project" />
          <Picker.Item label="Task" value="Task" />
        </Picker>
      </View>

            <Pressable style={localStyles.nextButton} onPress={() => handleCreateProject()
            }>
                <Text style={localStyles.nextButtonText}>Next</Text>
            </Pressable>
        </View>
    );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5dc',
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "darkblue",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "darkblue",
  },
  input: {
    borderWidth: 2,
    borderColor: "#0000b0",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#0000b0",
    borderRadius: 5,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#000080",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

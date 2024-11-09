import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { router } from 'expo-router';

const CreateProjectTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectName: initialProjectName } = route.params;
  const [projectName, setProjectName] = useState(initialProjectName || '');
  const user = auth.currentUser;

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      Alert.alert("Error", "Please enter a project name");
      return;
    }

    try {
      // Add the project to Firestore
      await addDoc(collection(db, 'projects'), {
        title: projectName,
        author: user?.uid,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Project created successfully!");
      router.push('/projects'); // Navigate back to projects page
    } catch (error) {
      console.error("Error creating project:", error);
      Alert.alert("Error", "Failed to create project");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{projectName}Testing</Text>

      <Text style={styles.subtitle}>Start by adding a task to your project</Text>

      <Pressable style={styles.addButton} onPress={() => router.push("/newProjectTask")}>
        <Text style={styles.addButtonText}>Add a Task</Text>
      </Pressable>

      <Pressable style={styles.nextButton} onPress={() => Alert.alert("Project Published")}>
        <Text style={styles.nextButtonText}>Publish Project</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#0000b0',
    borderRadius: 5,
    paddingVertical: 20,
    width: 400, // Fixed width for consistency
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#0000b0',
    borderRadius: 5,
    paddingVertical: 20,
    width: 400, // Same fixed width as addButton
    alignItems: 'center',
    marginTop: 20,
    
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateProjectTwo;
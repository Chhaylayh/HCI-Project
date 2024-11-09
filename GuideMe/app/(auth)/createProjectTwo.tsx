import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
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

  const [taskSteps, setTaskSteps] = useState([
    { id: 1, title: 'Create an Account', completed: false, route: '/createAccount' },
    { id: 2, title: 'Try some prompts', completed: false, route: '/tryPrompts' },
  ]);

  const handleCreateProject = async () => {
    try {
      await addDoc(collection(db, 'projects'), {
        title: projectName,
        author: user?.uid,
        createdAt: new Date(),
        steps: taskSteps,
      });
      router.push('/projects');
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleAddTask = () => {
    router.push('/newProjectTask');
  };

  
  const taskPairs = [];
  for (let i = 0; i < taskSteps.length; i += 2) {
    taskPairs.push(taskSteps.slice(i, i + 2));
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </Pressable>
          <Text style={styles.title}>Write a Short Story with ChatGPT</Text>
        </View>

        <View style={styles.taskContainer}>
          {taskPairs.map((pair, rowIndex) => (
            <View key={rowIndex} style={styles.taskRow}>
              {pair.map((step) => (
                <Pressable
                  key={step.id}
                  style={styles.taskButton}
                  onPress={() => router.push(step.route)} // Navigate to the corresponding route
                >
                  <View style={styles.taskButtonContent}>
                    <Text style={styles.taskButtonText}>{step.title}</Text>
                  </View>
                </Pressable>
              ))}
              {/* Add empty space if the row has only one item */}
              {pair.length === 1 && <View style={[styles.taskButton, styles.emptyTask]} />}
            </View>
          ))}

          <Pressable 
            style={styles.addButton} 
            onPress={handleAddTask}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={styles.publishButton}
            onPress={handleCreateProject}
          >
            <Text style={styles.publishButtonText}>Publish Project →</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const taskButtonSize = (windowWidth - 60) / 2; 

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  taskContainer: {
    flex: 1,
    gap: 12,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 20,
  },
  taskButton: {
    width: taskButtonSize,
    height: taskButtonSize,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskButtonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  emptyTask: {
    backgroundColor: 'transparent',
  },
  taskButtonText: {
    fontSize: 20, 
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 28, 
    width: '100%', 
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  addButtonText: {
    fontSize: 24,
    color: '#666',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
  publishButton: {
    backgroundColor: '#0000b0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateProjectTwo;

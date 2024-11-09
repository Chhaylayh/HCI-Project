import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { router } from 'expo-router';

const CreateProjectTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectName: initialProjectName, projectId } = route.params;
  const [projectName, setProjectName] = useState(initialProjectName || '');
  const [tasks, setTasks] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksCollection = collection(db, 'tasks');
      const tasksQuery = query(tasksCollection, where('projectId', '==', projectId));
      const taskDocs = await getDocs(tasksQuery);
      const taskList = taskDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    router.push({ pathname: "/createProjectThree", params: { projectId } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{projectName} Project</Text>
      <Text style={styles.subtitle}>Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item.title}</Text>}
        ListEmptyComponent={<Text style={styles.noTasks}>No tasks added yet.</Text>}
      />

      <Pressable style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add a Task</Text>
      </Pressable>

      <Pressable style={styles.nextButton} onPress={() => router.push("/NewProjectTask")}>
        <Text style={styles.nextButtonText}>Next</Text>
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
    marginBottom: 100,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateProjectTwo;
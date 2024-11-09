import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default function CreateProject() {
    const [projectName, setProjectName] = useState('');
    const [selectedApp, setSelectedApp] = useState('ChatGPT'); // Default to ChatGPT
    const [projectType, setProjectType] = useState('Project'); // Default to "Project"
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
                app: selectedApp,
                type: projectType,
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

            <Text style={styles.title}>Create a Project</Text>

            <Text style={styles.label}>Project Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Write a Short Story with ChatGPT"
                value={projectName}
                onChangeText={setProjectName}
            />

            <Text style={styles.label}>Relevant App</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedApp}
                    onValueChange={(itemValue) => setSelectedApp(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="ChatGPT" value="ChatGPT" />
                    <Picker.Item label="VS Code" value="VS Code" />
                    <Picker.Item label="Microsoft Excel" value="Microsoft Excel" />
                    <Picker.Item label="Discord" value="Discord" />
                    <Picker.Item label="Microsoft Teams" value="Microsoft Teams" />
                </Picker>
            </View>

            <Text style={styles.label}>Project Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={projectType}
                    onValueChange={(itemValue) => setProjectType(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                >
                    <Picker.Item label="Project" value="Project" />
                    <Picker.Item label="Task" value="Task" />
                </Picker>
            </View>

            <Pressable style={styles.nextButton} onPress={handleCreateProject}>
                <Text style={styles.nextButtonText}>Next ➞</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        fontSize: 18,
        color: '#0000b0',
        marginBottom: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: '#000',
    },
    input: {
        borderWidth: 2,
        borderColor: '#0000b0',
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#0000b0',
        borderRadius: 5,
        marginBottom: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#000',
    },
    nextButton: {
        backgroundColor: '#000080',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

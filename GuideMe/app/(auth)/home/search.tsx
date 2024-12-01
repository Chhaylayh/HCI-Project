import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { styles } from "../../universalStyles";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[][]>([]); // Store project titles and IDs
  const [allProjects, setAllProjects] = useState<Record<string, any>>({});

  // Fetch all projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      const projectDocs = await getDocs(collection(db, "projects"));
      const projectsData: Record<string, any> = {};
      projectDocs.forEach((doc) => {
        projectsData[doc.id] = doc.data();
      });
      setAllProjects(projectsData);
    };

    fetchProjects();
  }, []);

  // Search function
  const search = (text: string) => {
    if (text.trim() === "") {
      setSuggestions([]);
      return;
    }

    const newSuggestions = Object.entries(allProjects)
      .filter(([id, project]) =>
        project.title.toLowerCase().includes(text.toLowerCase())
      )
      .map(([id, project]) => [project.title, id]);

    setSuggestions(newSuggestions);
  };

  const onClickSuggestion = (suggestion: string[]) => {
    const suggestionId = suggestion[1];
    router.push(`/home/project/${suggestionId}`);
  };

  return (
    <View style={[styles.pageContainer, styles.beigeBackground]}>
      {/* Search Title */}
      <Text style={localStyles.titleText}>Search Projects</Text>

      {/* Search Input */}
      <View style={[localStyles.inputContainer]}>
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            search(text); // Call search function while typing
          }}
          autoCapitalize="none"
          style={localStyles.textInput}
        />
        <Ionicons name="search" size={32} />
      </View>

      {/* Suggestions */}
      {suggestions.length > 0 ? (
        <ScrollView style={localStyles.suggestionsContainer}>
          {suggestions.map((sug, i) => (
            <Pressable
              key={i}
              onPress={() => onClickSuggestion(sug)}
              style={localStyles.suggestionButton}
            >
              <Text style={localStyles.suggestionText}>{sug[0]}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : (
        <Text style={[styles.itemText, { color: "darkblue" }]}>
          Search for a project to explore or continue!
        </Text>
      )}

      {/* No Results */}
      {searchText && suggestions.length === 0 && (
        <Text style={localStyles.noResultsText}>No projects found</Text>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  // Title text style
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "darkblue",
    textAlign: "center",
    marginBottom: 30,
  },

  // Input field and icon row style
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "darkblue",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 5,
  },

  // Suggestions container
  suggestionsContainer: {
    marginTop: 20,
  },

  // Individual suggestion button style
  suggestionButton: {
    backgroundColor: "darkblue",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  suggestionText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  // No results text style
  noResultsText: {
    marginTop: 20,
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

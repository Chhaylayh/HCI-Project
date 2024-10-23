import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { styles } from "../../universalStyles";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import tasks from "@/dbMocks/tasks";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const keys = Object.keys(tasks);

  const search = () => {
    if (searchText.trim() === "") return; // don't search if input is empty

    let newSuggestions: string[] = [];
    for (let key in keys) {
      let possibleSuggestion = keys[key].toLowerCase();
      if (possibleSuggestion.includes(searchText.toLowerCase())) {
        newSuggestions.push(keys[key]);
      }
    }

    setSuggestions(newSuggestions);
    setIsSearched(true); // Mark that a search was performed
  };

  const onClickSuggestion = (suggestionText: string) => {
    const suggestionId = tasks[suggestionText].id;
    router.setParams({ taskId: suggestionId });
    router.push("/task");
  };

  // Dummy additional results, just to display without functionality
  const additionalResults = [
    "How to install Visual Studio Code?",
    "How to install Visual Studio Code Extension?",
    "How to set up a computer?",
  ];

  return (
    <View style={styles.pageContainer}>
      {/* Back Button */}
      <Pressable onPress={() => router.back()} style={localStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="blue" />
        <Text style={localStyles.backText}>Back</Text>
      </Pressable>

      {/* Search Title */}
      <Text style={localStyles.titleText}>Search</Text>

      {/* Search Input */}
      <View style={[localStyles.inputContainer]}>
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setIsSearched(false); // Reset suggestions when typing
          }}
          autoCapitalize="none"
          onSubmitEditing={search}
          style={localStyles.textInput}
        />
        <Pressable onPress={() => search()}>
          <Ionicons name="search" size={32} />
        </Pressable>
      </View>

      {/* Suggestions */}
      {isSearched && suggestions.length > 0 && (
        <ScrollView style={localStyles.suggestionsContainer}>
          {suggestions.map((sug, i) => (
            <Pressable
              key={i}
              onPress={() => onClickSuggestion(sug)}
              style={localStyles.suggestionButton}
            >
              <Text style={localStyles.suggestionText}>{sug}</Text>
            </Pressable>
          ))}

          {/* Additional Static Suggestions */}
          {additionalResults.map((result, i) => (
            <View key={i} style={localStyles.suggestionButton}>
              <Text style={localStyles.suggestionText}>{result}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* No Results */}
      {isSearched && suggestions.length === 0 && (
        <Text style={localStyles.noResultsText}>No results found</Text>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  // Back button style
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: "blue",
    marginLeft: 5,
  },

  // Title text style
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    marginBottom: 30,
  },

  // Input field and icon row style
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
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
    backgroundColor: "blue",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 30,  // Adding space between buttons
    marginBottom: 30, // Adding space between buttons
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

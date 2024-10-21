import { View, Text, TextInput, Pressable } from "react-native";
import { styles } from "../../universalStyles";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import tasks from "@/dbMocks/tasks";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const keys = Object.keys(tasks);

  const search = () => {
    if (searchText in keys) {
      // show page for tasks[searchtext]
    }
  };

  const generateSuggestions = (text: string) => {
    setSearchText(text);
    let newSuggestions: string[] = [];
    for (let key in keys) {
      let possibleSuggestion = keys[key].toLowerCase();
      if (possibleSuggestion.includes(text.toLowerCase())) {
        newSuggestions.push(keys[key]);
      }
    }
    // display suggestions
    setSuggestions(newSuggestions);
  };

  const onClickSuggestion = (suggestionText: string) => {
    const suggestionId = tasks[suggestionText].id;
    router.setParams({taskId: suggestionId});
    router.push("/task")
  }

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.titleBlue}>Search</Text>
      <View style={[styles.input, styles.iconRow]}>
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={generateSuggestions}
          autoCapitalize="none"
          style={{ flex: 1 }}
        />
        <Pressable onPress={() => search()}>
          <Ionicons name="search" size={32} />
        </Pressable>
      </View>
      {suggestions.length > 0 && (
        <View style={localStyles.searchSuggestionContainer} >
          {suggestions.map((sug, i) => (
            <Pressable key={i} onPress={()=>onClickSuggestion(sug)}>
            <Text style={[localStyles.searchSuggestionText, i===0 ? {color: "darkblue"} : {}]}>{sug}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
    searchSuggestionContainer: {
      backgroundColor: Colors.light.lightGray,
      paddingVertical: 12,
      paddingHorizontal: 25,
      marginTop: -20,
      marginHorizontal: 5
    },
    searchSuggestionText: {
        borderBottomWidth: 1,
        borderBottomColor: "white"
      },
    bottom: {
      marginBottom: 30,
    }
  });
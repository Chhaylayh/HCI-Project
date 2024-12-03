import { View, Text, TextInput, Pressable, ScrollView, Image } from "react-native";
import { styles } from "../../universalStyles";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<{ title: string; id: string; icon: string }[]>([]); // Store project titles and IDs
  const [allProjects, setAllProjects] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [inProgressProject, setInProgressProject] = useState<string | null>(null);

  // Fetch all projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      const projectDocs = await getDocs(query(collection(db, "projects"), where("published", "==", true)));
      const projectsData: Record<string, any> = {};
      projectDocs.forEach((doc) => {
        projectsData[doc.id] = doc.data();
      });
      setAllProjects(projectsData);
    };
    const fetchUserData = async () => { // reuse fetching so user can see their inProgress project status (grey out feature). ZO
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(collection(db, "users"), user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const inProgress = userData.inProgress || [];
          setInProgressProject(inProgress.length > 0 ? inProgress[0].id : null);
        }
      }
    };
    fetchUserData();
    fetchProjects();
  }, []);

  const getAppImage = (appName: string) => {
    const appImages: { [key: string]: string } = {
      "VS Code": 'https://tidalcycles.org/assets/images/vscodeicon-42dc264fde2adb74cc197fe6d02b183c.png',
      "ChatGPT": 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png',
      "Discord": 'https://static.vecteezy.com/system/resources/previews/023/741/066/non_2x/discord-logo-icon-social-media-icon-free-png.png',
      "Microsoft Excel": 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png', 
    };
    return appImages[appName];
  };

  // Search function
  const search = (text: string) => {
    if (text.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerCaseText = text.toLowerCase();
    const newSuggestions = Object.entries(allProjects)
      .filter(([id, project]) =>
        project.title.toLowerCase().includes(lowerCaseText) || project.app.toLowerCase().includes(lowerCaseText)
      )
      .map(([id, project]) => ({
        title: project.title,
        id,
        icon: getAppImage(project.app), // Add app icon. ZO
      }));

    setSuggestions(newSuggestions);
  };

  const onClickSuggestion = async (suggestionId: string) => {
    if (inProgressProject) {
      alert("You already have a project in progress. Please finish it first!");
      return;
    }
    setLoading(true); // Start loading
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(collection(db, "users"), user.uid);
      await updateDoc(userRef, {
        inProgress: arrayUnion({ id: suggestionId, step: 0 }),
      });

      router.push(`/home/project/${suggestionId}`);
    } catch (error) {
      console.error("Error starting project:", error);
      alert("Failed to start the project. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
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
              onPress={() => onClickSuggestion(sug.id)}
              style={[styles.button, {marginVertical: 10, flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: inProgressProject ? "#CCCCCC" : "darkblue",}]}
            >
              <Image
                source={{ uri: sug.icon }}
                style={localStyles.iconStyle}
                resizeMode="contain"
              />
              <Text style={localStyles.suggestionText}>{sug.title}</Text>
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
  iconStyle: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
});

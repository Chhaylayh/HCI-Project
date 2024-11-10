import { Pressable, Text, View, FlatList, Image } from "react-native";
import { router } from "expo-router";
import { styles } from "../../universalStyles";
import { auth } from "@/firebase";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

interface ItemProps {
  title: string;
  image: string;
  background: string;
}

const DATA = [
  { id: '1', title: 'ChatGPT', background: 'lightgreen', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png' },
  { id: '2', title: 'VS Code', background: 'lightblue', image: 'https://tidalcycles.org/assets/images/vscodeicon-42dc264fde2adb74cc197fe6d02b183c.png' },
  { id: '3', title: 'Microsoft Excel', background: 'green', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png' },
  { id: '4', title: 'Discord', background: 'darkblue', image: 'https://static.vecteezy.com/system/resources/previews/023/741/066/non_2x/discord-logo-icon-social-media-icon-free-png.png' },
  { id: '5', title: 'Microsoft Teams', background: '#B19CD9', image: 'https://www.thomas-krenn.com/redx/tools/mb_image.php/ct.ZHmFQ/cid.y04aedfd415189e63/Microsoft_Teams.png' },
];

const Item: React.FC<ItemProps> = ({ title, image, background }) => (
  <View style={[styles.item, { width: 150, marginRight: 20, backgroundColor: background, borderRadius: 10, alignItems: 'center', paddingVertical: 20 }]}>
    <Pressable
      onPress={() => {
        router.push({ pathname: "/home/project/browseProjects", params: { app: title } });
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 80, height: 80, marginBottom: 10 }}
        resizeMode="contain"
      />
      <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>{title}</Text>
    </Pressable>
  </View>
);

export default function Dashboard() {
  const user = auth.currentUser;
  const name = user?.email?.split("@")[0] || "user";

  return (
    <View style={[styles.pageContainer, styles.beigeBackground, { paddingHorizontal: 20, paddingVertical: 40 }]}>
      <Text style={[styles.titleBlue, { alignSelf: "center", fontSize: 24, fontWeight: "bold", marginBottom: 30 }]}>
        Welcome, {name}!
      </Text>

      {/* Full-width Buttons for Search and Projects */}
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Pressable
          style={{
            backgroundColor: 'darkblue',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            router.push("/home/search");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="search" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Search</Text>
          </View>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: 'darkblue',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            router.push("/home/project/projects");
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="plus" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Projects</Text>
          </View>
        </Pressable>
      </View>

      {/* Suggested Apps Section */}
      <Text style={[styles.titleBlue, { alignSelf: "center", fontSize: 20, marginBottom: 10 }]}>
        Suggested Apps
      </Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} image={item.image} background={item.background} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}
0
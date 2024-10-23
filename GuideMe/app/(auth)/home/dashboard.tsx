import { Pressable, Text, View, FlatList, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "../../universalStyles";

interface ItemProps {
  title: string;
  image: string;
  background: string;
}

{/* array that contains all suggested app info */}
const DATA = [
  { id: '1', title: 'ChatGPT', background: 'lightgreen', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png' },
  { id: '2', title: 'VS Code', background: 'lightblue', image: 'https://tidalcycles.org/assets/images/vscodeicon-42dc264fde2adb74cc197fe6d02b183c.png' },
  { id: '3', title: 'Microsoft Excel', background: 'green', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/826px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png' },
  { id: '4', title: 'Discord', background: 'darkblue', image: 'https://static.vecteezy.com/system/resources/previews/023/741/066/non_2x/discord-logo-icon-social-media-icon-free-png.png' },
  { id: '5', title: 'Miscrosoft Teams', background: '#B19CD9', image: 'https://www.thomas-krenn.com/redx/tools/mb_image.php/ct.ZHmFQ/cid.y04aedfd415189e63/Microsoft_Teams.png' },
];

{/* item display */}
const Item: React.FC<ItemProps> = ({ title, image, background }) => (
  <View style={[styles.item, { width: 150, marginRight: 20, backgroundColor: background, borderRadius: 10 }]} >
    <Pressable
      onPress={() => {
        router.push("/home/projects");
      }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 100, height: 100, marginBottom: 10 }}
        resizeMode="cover"
      />
      {/* <Text style={[styles.itemText, { alignSelf: "center"}]}>{title}</Text> */}
    </Pressable>
  </View>
);

export default function Dashboard() {
  const { username } = useLocalSearchParams();

  return (
    <View style={[styles.pageContainer, { paddingHorizontal: 20 }]}>
      <Text style={[styles.titleBlue, { alignSelf: "center", marginTop: -20}]}>Welcome, {username}!</Text>
      
      {/* row for search button and text */}
      <View style={[styles.rowContainer]}>
        <Pressable
          style={[styles.buttonLarge, { marginRight: 0 }]}
          onPress={() => {
            router.push("/home/search");
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        {/* light blue filler to guide the buttons */}
        <View style={[styles.pageContainer, { marginTop: -20, backgroundColor: 'lightblue', height: 100 }]}>
          <Text style={[styles.inputLabel, { marginTop: 20, marginLeft: 10 }]}>{ '<-'} Have a specific issue?</Text>
        </View>
      </View>

      {/* row for projects button and text */}
      <View style={[styles.rowContainer]}>
        <Pressable
          style={[styles.buttonLarge, { marginRight: 0 }]}
          onPress={() => {
            router.push("/home/projects");
          }}
        >
          <Text style={styles.buttonText}>Projects</Text>
        </Pressable>
        {/* light blue filler to guide the buttons */}
        <View style={[styles.pageContainer, { marginTop: -20, backgroundColor: 'lightblue', height: 100 }]}>
          <Text style={[styles.inputLabel, { marginTop: 20, marginLeft: 10 }]}>{ '<-'} Start a project for an app.</Text>
        </View>
      </View>

      {/* horizontal flatList */}
      <Text style={[styles.titleBlue, { alignSelf: "center" }]}>Suggested apps:</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} image={item.image} background={item.background} />}
        keyExtractor={item => item.id}
        horizontal
        //showsHorizontalScrollIndicator={false}
        //style={{ marginTop: 20 }}
      />
    </View>
  );
}

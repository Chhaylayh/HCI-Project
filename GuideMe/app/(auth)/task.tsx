import { View, Text, Image, ScrollView } from "react-native"; 
import { styles } from "../universalStyles";
import { useLocalSearchParams } from "expo-router";

export default function Task() {
    const { taskId } = useLocalSearchParams();
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.pageContainerTasks}>
                <Text style={styles.titleBlue}>Search</Text>  
                <Text style={styles.pageContainerTasks}>    
                    How to Setup VS Code{"\n"}
                    {"\n"}
                    Step 1:
                    <Text style={styles.smallText}>  First go to the home page and click on download on the upper right</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/27fe0416f38191aba10ca36c572f91dc.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>

                   {"\n"} Step 2:
                   <Text style={styles.smallText}> When reaching the download page, please choose your current operating system</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/0073af62d145049e08c69eb9f0ed0abb.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 3:
                   <Text style={styles.smallText}> After downloading VSCode, Open it up and it should come to this main screen. Feel free to add and themes you may like. We will be keeping it default for the tutorial</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/c43f807af9c5fc224695a454d0e8cef7.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 4:
                   <Text style={styles.smallText}> Clicking next should bring you to this screen.</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/ae0c1574f939b93230edf01cbc67d6bb.png' }}
                    style={styles.imageStyle}
                />

                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 5:
                   <Text style={styles.smallText}> At the left side of the screen, we should see the different extensions. For this tutorial we will focus on python</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/c1b0c9655e6305cc7a1f7843a68540a0.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>

                   {"\n"} Step 6:
                   <Text style={styles.smallText}> Click on the first python extension and click on install</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/5cea96e58ea0045e1d559323abe60c16.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 7:
                   <Text style={styles.smallText}> After installing, the home screen should look like this</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/7c9b3112366213b7eeab6433cb99cd71.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 8:
                   <Text style={styles.smallText}> Click on create a new file and this page should popup</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/f1d6e896094fad536e0344e53104ab16.png' }}
                    style={styles.imageStyle}
                />
                <Text style={styles.pageContainerTasks}>
                   {"\n"} Step 9:
                   <Text style={styles.smallText}> Type in "print("Hello World")" This will be our first program!</Text>
                </Text>
                <Image
                    source={{ uri: 'https://i.gyazo.com/e152fbedef6df82755466e9a7928c8e9.png' }}
                    style={styles.imageStyle}
                />
            </View>
        </ScrollView>
    );
}

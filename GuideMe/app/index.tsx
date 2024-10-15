import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "./screens/HomeScreen";

export default function index() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={homeScreen} />
        </Tab.Navigator>
    );
  }
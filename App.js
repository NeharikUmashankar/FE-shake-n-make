
import { StyleSheet, Text, View, Button } from "react-native";
import RandomCocktails from "./components/RandomCocktails";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RandomButton from "./components/RandomButton";
import HomeScreen from "./components/HomeScreen";
import HomeButton from "./components/HomeButton";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeButton" component={HomeButton} />
        <Stack.Screen name="Random" component={RandomButton} options = {title = 'Random Cocktail'}/>
        <Stack.Screen name="Random Cocktail" component={RandomCocktails} options = {title = 'Random Cocktail'}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

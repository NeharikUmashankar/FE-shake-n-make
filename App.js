import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import RandomCocktails from "./components/RandomCocktails";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RandomButton from "./components/Button";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Random Button" component={RandomButton} options = {title = 'Random Cocktail'}/>
        <Stack.Screen name="Random Cocktail" component={RandomCocktails} options = {title = 'Random Cocktail'}/>
      </Stack.Navigator>
      {/* <View style={styles.container}>
      <Text>Welcome to Shake n Make!</Text>
      <RandomButton />
      <StatusBar style="auto" />
    </View> */}
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

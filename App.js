
import { StyleSheet, Text, View, Button } from "react-native";
import RandomCocktails from "./components/RandomCocktails";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RandomButton from "./components/RandomButton";
import HomeScreen from "./components/HomeScreen";
import HomeButton from "./components/HomeButton";
import Navigator from './routes/homeStack' 
import { useState } from "react";
import { UserContext } from "./components/UserContext";
import { AdultContext } from "./components/AdultContext";
// 'Navigator' is what I'm choosing to call

const Stack = createNativeStackNavigator();


export default function App() {
  const [loggedUser,setLoggedUser] = useState(false)
  const [over18, setOver18] = useState(false)
  
  return (
    <AdultContext.Provider value = {{over18, setOver18}}>
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <Navigator/>
    </UserContext.Provider>
    </AdultContext.Provider>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="HomeButton" component={HomeButton} />
    //     <Stack.Screen name="Random" component={RandomButton} options = {title = 'Random Cocktail'}/>
    //     <Stack.Screen name="Random Cocktail" component={RandomCocktails} options = {title = 'Random Cocktail'}/>
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
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

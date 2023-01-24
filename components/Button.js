import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text } from "react-native";
import RandomCocktails from "./RandomCocktails";


const RandomButton = (({navigation}) => {
    return (
        <View style = {styles.container}>
        <Button 
        title='Random Cocktail' 
        onPress={() => {
            navigation.navigate('Random Cocktail')
            // return <RandomCocktails/>
        }}
        />
        <StatusBar style = 'auto'/>
        </View>
    )
})

export default RandomButton;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  






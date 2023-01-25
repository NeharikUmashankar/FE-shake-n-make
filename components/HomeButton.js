import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text } from "react-native";



const HomeButton = (({navigation}) => {
    return (
        <View style = {styles.container}>
        <Button 
        title='Home' 
        onPress={() => {
            navigation.navigate('HomeScreen')
        }}
        />
        <StatusBar style = 'auto'/>
        </View>
    )
})

export default HomeButton;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
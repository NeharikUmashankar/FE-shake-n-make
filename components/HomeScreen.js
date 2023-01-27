import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import FilterInput from "./FilterInput";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const HomeScreen = ({ navigation }) => {

  const {over18, setOver18} = useContext(AdultContext)
  const { loggedUser, setLoggedUser } = useContext(UserContext)



  const randomPressHandler = () => {
    navigation.navigate("Random cocktail");
  };
  const AZPressHandler = () => {
    navigation.navigate("Alphabet List");
  };

  const choicePressHandler = () => {
    navigation.navigate("Virgin?");
  };

  return (
    <View>
      <Text>Feelin' thirsty? Select an option below:</Text>
      <Button title="Get a random cocktail" onPress={randomPressHandler} />
      <Button title="Get cocktails by letter" onPress={AZPressHandler} />
      {over18 === true || loggedUser.over18 === true? (
        <Button title="Non-alcoholic drinks" onPress={choicePressHandler} />
      ) : null} 
      <FilterInput navigation= {navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default HomeScreen;

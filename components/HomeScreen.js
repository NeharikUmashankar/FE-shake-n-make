import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Filter from "./Filter";
import { useState } from "react";
// import Accelerometer from "../components/Accelerometer";

const HomeScreen = ({ navigation }) => {
  const adult = navigation.state.params;
  const { over18 } = adult;

  const randomPressHandler = () => {
    navigation.navigate("Random cocktail", adult);
  };
  const AZPressHandler = () => {
    navigation.navigate("Alphabet List", adult);
  };

  const choicePressHandler = () => {
    navigation.navigate("Virgin?");
  };

  return (
    <View>
      <Text>Feelin' thirsty? Select an option below:</Text>
      <Button title="Get a random cocktail" onPress={randomPressHandler} />
      <Button title="Get cocktails by letter" onPress={AZPressHandler} />
      {over18 === true ? (
        <Button title="Non-alcoholic drinks" onPress={choicePressHandler} />
      ) : null}
    

      <Filter />
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

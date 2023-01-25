import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  const randomPressHandler = () => {
    navigation.navigate("Random cocktail");
  };
  const AZPressHandler = () => {
    navigation.navigate("Cocktails by Alphabet");
  };
  return (
    <View>
      <Text>Feelin' thirsty? Select an option below:</Text>
      <Button title="Get a random cocktail" onPress={randomPressHandler} />
      <Button title="Get cocktails by letter" onPress={AZPressHandler} />
    </View>
  );
};

export default HomeScreen;

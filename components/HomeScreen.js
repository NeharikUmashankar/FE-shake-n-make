import { View, Text, Button, Pressable } from "react-native";
import FilterInput from "./FilterInput";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const HomeScreen = ({ navigation }) => {
  const { over18, setOver18 } = useContext(AdultContext);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

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
    <View className="bg-lightestBlue h-full">
      <Text className="text-stone-900 m-2">
        Feelin' thirsty? Select an option below:
      </Text>
      <Button
        className="bg-black"
        title="Get a random cocktail"
        onPress={randomPressHandler}
      />
      <Button title="Get cocktails by letter" onPress={AZPressHandler} />
      {over18 === true || loggedUser.over18 === true ? (
        <Button title="Non-alcoholic drinks" onPress={choicePressHandler} />
      ) : null}
      <FilterInput navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

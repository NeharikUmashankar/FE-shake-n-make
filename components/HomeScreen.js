import { View, Text, Pressable } from "react-native";
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
      <View className="bg-sky-200/30 m-5 p-3 rounded-3xl">
        <Text className="text-center text-stone-900 m-2 text-xl">
          Feelin' thirsty?
        </Text>
        <Pressable
          className="bg-mainBlue m-2 p-3 w-3/5 self-center rounded-full"
          title="Get a random cocktail"
          onPress={randomPressHandler}
        >
          <Text className="text-white text-center">Get a random cocktail</Text>
        </Pressable>
        <Pressable
          className="bg-mainBlue m-2 p-3 w-3/5 self-center rounded-full"
          title="Get cocktails by letter"
          onPress={AZPressHandler}
        >
          <Text className="text-white text-center">
            Get cocktails by letter
          </Text>
        </Pressable>

        {over18 === true || loggedUser.over18 === true ? (
          <Pressable
            className="bg-mainBlue m-2 p-3 mb-4 w-3/5 self-center rounded-full"
            title="Non-alcoholic drinks"
            onPress={choicePressHandler}
          >
            <Text className="text-white text-center">Non-alcoholic drinks</Text>
          </Pressable>
        ) : null}
      </View>

      <FilterInput navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

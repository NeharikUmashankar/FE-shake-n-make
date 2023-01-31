import { useEffect, useState } from "react";
import {
  getRandomCocktail,
  getCocktailIngredients,
  getCocktailMeasures,
} from "../api";
import { View, ScrollView, Text, Image } from "react-native";
import ImageViewer from "./ImageViewer";
import Accelerometer from "../components/Accelerometer";
import cocktailAccelerometer from "../components/Accelerometer";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const RandomCocktails = ({ navigation }) => {
  const [cocktail, setCocktail] = useState({});
  const [cocktailMeasures, setCocktailMeasures] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { over18, setOver18 } = useContext(AdultContext);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  let adult;
  if (loggedUser) {
    adult = loggedUser.over18;
  } else {
    adult = over18;
  }

  useEffect(() => {
    getRandomCocktail(adult).then((info) => {
      setCocktail(info);
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
      setLoading(false);
    });
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    setCocktailIngredients(getCocktailIngredients(cocktail));
    setCocktailMeasures(getCocktailMeasures(cocktail));
  }, [cocktail]);

  const randomCocktailPlaceholderImage = cocktail.strDrinkThumb;

  if (loading)
    return (
      <View className="bg-sky-100/30">
        <Text>Loading ingredients, please wait...</Text>
      </View>
    );

  return (
    <ScrollView className="bg-lightestBlue">
      <Text className="p-3 m-4 text-center border border-darkestBlue bg-sky-300/40">
        Shake phone to refresh
      </Text>
      <Text className="text-center text-xl">{cocktail.strDrink}</Text>
      <View className="self-center my-5 rounded-full">
        <ImageViewer
          placeholderImageSource={{ uri: randomCocktailPlaceholderImage }}
        ></ImageViewer>
      </View>
      <Text className="mt-8 mb-2 w-2/6 text-center self-center text-xl">
        Ingredients
      </Text>
      <View className="bg-sky-100/30 p-4  w-2/5 self-center">
        {cocktailIngredients.map((ingredient, i) => {
          return (
            <Text key={ingredient}>
              {ingredient}: {cocktailMeasures[i]}{" "}
            </Text>
          );
        })}
      </View>

      <Text className="mt-8 mb-2 w-1/6 text-center self-center text-xl">
        Recipe
      </Text>
      <Text className="bg-sky-100/30 mx-6 mb-6 p-4 text-center">
        {cocktail.strInstructions}
      </Text>
      <Accelerometer navigation={navigation}></Accelerometer>

      {/* <RandomButton /> */}
    </ScrollView>
  );
};

export default RandomCocktails;

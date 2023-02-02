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
import FavouriteButton from "./FavouriteButton";

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
      <Text className="text-center text-xl bg-sky-100/30 w-3/5 self-center my-4 p-2 rounded-md border border-black">{cocktail.strDrink}</Text>
      <FavouriteButton cocktail={cocktail} />
      <View className="self-center my-5 rounded-full">
        <ImageViewer
          placeholderImageSource={{ uri: randomCocktailPlaceholderImage }}
        ></ImageViewer>
      </View>
      <Text className="bg-sky-100/30 mt-8 w-2/6 p-2 text-center self-center text-xl rounded-t-lg">
        Ingredients
      </Text>
      <View className="bg-sky-100/30 p-4  w-3/5 self-center rounded-lg">
        {cocktailIngredients.map((ingredient, i) => {
          return (
            <Text className = 'text-center' key={ingredient}>
              {ingredient}: {cocktailMeasures[i]}{" "}
            </Text>
          );
        })}
      </View>

      <Text className="bg-sky-100/30 mt-8 w-2/6 p-2 text-center self-center text-xl rounded-t-lg">
        Recipe
      </Text>
      <Text className="bg-sky-100/30 mx-6 mb-6 p-4 w-4/5 text-center self-center rounded-lg">
        {cocktail.strInstructions}
      </Text>
      <Accelerometer navigation={navigation}></Accelerometer>
    </ScrollView>
  );
};

export default RandomCocktails;

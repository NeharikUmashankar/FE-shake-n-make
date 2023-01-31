import { useEffect, useState } from "react";
import {
  getCocktailIngredients,
  getCocktailById,
  getCocktailMeasures,
} from "../api";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native";
import ImageViewer from "./ImageViewer";

const Cocktail = ({ navigation }) => {
  const { cocktailName, cocktailId } = navigation.state.params;

  const [cocktail, setCocktail] = useState({});
  const [cocktailMeasures, setCocktailMeasures] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCocktailIngredients(getCocktailIngredients(cocktail));
    setCocktailMeasures(getCocktailMeasures(cocktail));
  }, [cocktail]);

  useEffect(() => {
    getCocktailById({ cocktailId }).then((info) => {
      setCocktail(info);
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
      setLoading(false);
    });
  }, []);

  const placeholderImage = cocktail.strDrinkThumb;

  if (loading)
    return (
      <View>
        <Text>Loading Cocktail Info, please wait...</Text>
      </View>
    );

  return (
    <ScrollView className="bg-lightestBlue" key={cocktailName}>
      <Text className="text-center text-xl bg-sky-100/30 w-3/5 self-center my-4 p-2 rounded-md border border-black">
        {" "}
        {cocktailName}
      </Text>
      <View className = 'self-center'>
        <ImageViewer
          placeholderImageSource={{ uri: placeholderImage }}
        ></ImageViewer>
      </View>
      <Text className="bg-sky-100/30 mt-8 w-2/6 p-2 text-center self-center text-xl">
        Ingredients
      </Text>
      <View className="bg-sky-100/30 p-4  w-3/5 self-center" key={cocktailName}>
        {cocktailIngredients.map((ingredient, i) => {
          return (
            <Text className="text-center" key={cocktailName}>
              {ingredient}: {cocktailMeasures[i]}{" "}
            </Text>
          );
        })}
      </View>
      <Text className=" bg-sky-100/30 mt-8 w-2/6 text-center self-center text-xl p-2">
        Recipe
      </Text>

      <Text className="bg-sky-100/30 mx-6 mb-6 p-4 text-center self-center w-3/5">
        {" "}
        {cocktail.strInstructions}
      </Text>
    </ScrollView>
  );
};

export default Cocktail;

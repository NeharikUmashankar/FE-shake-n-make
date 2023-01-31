import { useEffect, useState } from "react";
import {
  getCocktailIngredients,
  getCocktailById,
  getCocktailMeasures,
} from "../api";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native";
import ImageViewer from "./ImageViewer";
import FavouriteButton from "./FavouriteButton";

const Cocktail = ({ route,navigation }) => {


  const { cocktailName, cocktailId } = route.params;

  const [cocktail, setCocktail] = useState({});
  const [cocktailMeasures, setCocktailMeasures] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCocktailIngredients(getCocktailIngredients(cocktail));
    setCocktailMeasures(getCocktailMeasures(cocktail));
  }, [cocktail]);

  useEffect(() => {
    getCocktailById({ cocktailId }).then((info) => {
      return setCocktail(info);
    })
    .then(() => {
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
      setLoading(false);
    })
  }, []);

  const placeholderImage = cocktail.strDrinkThumb;

  if (loading)
    return (
      <View>
        <Text>Loading Cocktail Info, please wait...</Text>
      </View>
    );

  return (
    <ScrollView key = {cocktailName}>
      <View >
        <Text>Info for {cocktailName}:</Text>
        <FavouriteButton cocktail={cocktail} />
      </View>

      <View>
        <ImageViewer
          placeholderImageSource={{ uri: placeholderImage }}
        ></ImageViewer>
      </View>
      <Text key={cocktailName}>
        Ingredients needed:
        {cocktailIngredients.map((ingredient, i) => {
          return (
            <Text key = {cocktailName}>
              {ingredient}: {cocktailMeasures[i]}{" "}
            </Text>
          );
        })}
      </Text>

      <Text> Recipe: {cocktail.strInstructions}</Text>
    </ScrollView>
  );
};



export default Cocktail;

import { useEffect, useState } from "react";
import {
  getCocktailIngredients,
  getCocktailById,
  getCocktailMeasures,
} from "../api";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "react-native";
import ImageViewer from "./ImageViewer";

const Cocktail = ({ route,navigation }) => {
  const { cocktailName, cocktailId } = route.params;

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
    <ScrollView key = {cocktailName}>
      <Text>Info for {cocktailName}:</Text>
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

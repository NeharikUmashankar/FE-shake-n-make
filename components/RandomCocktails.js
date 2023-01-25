import { useEffect, useState } from "react";
import { getRandomCocktail, getCocktailIngredients } from "../api";
import { View, Text } from "react-native";
import { Image } from "react-native";
import RandomButton from "./RandomButton";

const RandomCocktails = () => {
  const [cocktail, setCocktail] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRandomCocktail().then((info) => {
      setCocktail(info);
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setCocktailIngredients(getCocktailIngredients(cocktail));
  }, [cocktail]);

  if (loading)
    return (
      <View>
        <Text>Loading ingredients, please wait...</Text>
      </View>
    );

  return (
    <View>
      <Text>Your randomly generated drink: {cocktail.strDrink}</Text>
      <Image source={cocktail.strDrinkThumb} />
      <Text>
        Ingredients needed:
        {cocktailIngredients.map((ingredient) => {
          return <Text>{ingredient} </Text>;
        })}
      </Text>
      <Text> Recipe: {cocktail.strInstructions}</Text>
      <RandomButton />
    </View>
  );
};

export default RandomCocktails;
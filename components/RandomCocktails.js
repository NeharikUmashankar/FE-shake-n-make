import { useEffect, useState } from "react";
import { getRandomCocktail, getCocktailIngredients } from "../api";
import { View, Text } from "react-native";
import { Image } from "react-native";

const RandomCocktails = () => {
  const [cocktail, setCocktail] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);

  useEffect(() => {
    getRandomCocktail().then((info) => {
      setCocktail(info);
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
    });
  }, []);

  if (cocktail && cocktailIngredients) {
    console.log(cocktailIngredients);
    return (
      <View>
        <Text>Your random drink of the day: {cocktail.strDrink}</Text>
        <Image source={cocktail.strDrinkThumb} />
        <Text>
          Ingredients needed:
          {cocktailIngredients.map((ingredient) => {
            return <Text>{ingredient}</Text>;
          })}
        </Text>
      </View>
    );
  }
};

export default RandomCocktails;

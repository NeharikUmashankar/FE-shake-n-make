import { useEffect, useState } from "react";
import { getRandomCocktail, getCocktailIngredients } from "../api";
import { View, Text } from "react-native";
import { Image } from "react-native";

const Cocktail = ({navigation}) => {

  const {cocktailName}  = navigation.state.params
  
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

  console.log(cocktailName);

  return (
    <View>
      <Text>Info for {cocktailName}:</Text>
    </View>
  );
};

export default Cocktail;

import { useEffect, useState } from "react";
import { getRandomCocktail, getCocktailIngredients, getCocktailById, getCocktailMeasures } from "../api";
import { View, Text ,ScrollView} from "react-native";
import { Image } from "react-native";

const Cocktail = ({navigation}) => {

  const {cocktailName, cocktailId}  = navigation.state.params

    
  const [cocktail, setCocktail] = useState({});
  const [cocktailMeasures, setCocktailMeasures] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setCocktailIngredients(getCocktailIngredients(cocktail));
    setCocktailMeasures(getCocktailMeasures(cocktail));
  }, [cocktail]);

  useEffect(() => {
    getCocktailById({cocktailId}).then((info) => {
      setCocktail(info);
      getCocktailIngredients(cocktail);
      setCocktailIngredients(getCocktailIngredients(cocktail));
      setLoading(false);
    })
  }, [])

  if (loading)
    return (
      <View>
        <Text>Loading Cocktail Info, please wait...</Text>
      </View>
    );


  return (
    <ScrollView>
      <Text>Info for {cocktailName}:</Text>
      <Image source={cocktail.strDrinkThumb} />
      <Text>
        Ingredients needed:
        {cocktailIngredients.map((ingredient, i) => {
          return <Text>{ingredient}: {cocktailMeasures[i]} </Text>
        })}
      </Text>

      <Text> Recipe: {cocktail.strInstructions}</Text>
    </ScrollView>
  );
};

export default Cocktail;

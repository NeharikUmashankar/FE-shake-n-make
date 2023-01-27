import { useEffect, useState } from "react";
import {
  getRandomCocktail,
  getCocktailIngredients,
  getCocktailMeasures,
} from "../api";
import { View, Text, Image } from "react-native";
import RandomButton from "./RandomButton";
import ImageViewer from "./ImageViewer";
import Accelerometer from "../components/Accelerometer";
import cocktailAccelerometer from "../components/Accelerometer";


const RandomCocktails = ({ navigation }) => {
  const { over18 } = navigation.state.params;
  const [cocktail, setCocktail] = useState({});
  const [cocktailMeasures, setCocktailMeasures] = useState({});
  const [cocktailIngredients, setCocktailIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getRandomCocktail(over18).then((info) => {
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
      <View>
        <Text>Loading ingredients, please wait...</Text>
      </View>
    );

  return (
    <View>
      <Text>Your randomly generated drink: {cocktail.strDrink}</Text>
      <ImageViewer placeholderImageSource={{uri: randomCocktailPlaceholderImage}}></ImageViewer>
      <Text>
        Ingredients needed:
        {cocktailIngredients.map((ingredient, i) => {
          return (
            <Text key={ingredient}>
              {ingredient}: {cocktailMeasures[i]}{" "}
            </Text>
          );
        })}
      </Text>
      <Text> Recipe: {cocktail.strInstructions}</Text>
      <Accelerometer navigation={navigation} > 
      </Accelerometer>
      
      {/* <RandomButton /> */}
    </View>
  );
};

export default RandomCocktails;

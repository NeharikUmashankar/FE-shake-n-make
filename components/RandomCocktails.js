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
      <View>
        <Text>Loading ingredients, please wait...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Text className = 'p-3 m-4 text-center border border-black'>Shake phone to refresh</Text>
      <Text>Your randomly generated drink: {cocktail.strDrink}</Text>
      <ImageViewer
        placeholderImageSource={{ uri: randomCocktailPlaceholderImage }}
      ></ImageViewer>
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
      <Accelerometer navigation={navigation}></Accelerometer>

      {/* <RandomButton /> */}
    </ScrollView>
  );
};

export default RandomCocktails;

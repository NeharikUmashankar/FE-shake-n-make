import { getCocktailsByLetter } from "../api";
import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const CocktailsAZ = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCocktailsByLetter("A").then(({ drinks }) => {
      setLoading(true);

      setCocktails((currCocktails) => {
        const newCocktail = [...currCocktails];

        for (let drink of drinks) {
          newCocktail.push(drink.strDrink);
        }
        return newCocktail;
      });

      setLoading(false);
    });
  }, []);

  const AZpressHandler = () => {};

  if (loading)
    return (
      <View>
        <Text>Cocktails loading, pls wait...</Text>
      </View>
    );

  return (
    <View>
      <Text>Cocktails by A to Z coming soon....</Text>
      {cocktails.map((cocktail) => {
        return (
          <Button
            title={cocktail}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: cocktail,
              });
            }}
          />
        );
      })}
    </View>
  );
};

export default CocktailsAZ;

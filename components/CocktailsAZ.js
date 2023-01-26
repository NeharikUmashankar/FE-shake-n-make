import { getCocktailsByLetter } from "../api";
import { useState, useEffect } from "react";
import { View, Text, Button ,ScrollView} from "react-native";

const CocktailsAZ = ({ navigation }) => {
  console.log(navigation.state.params)

 const {letter} = navigation.state.params
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCocktailsByLetter(letter).then(({ drinks }) => {
      setLoading(true);

      setCocktails((currCocktails) => {
        const newCocktail = [...currCocktails];

        for (let drink of drinks) {
          newCocktail.push({name:drink.strDrink, id:drink.idDrink});
        }
        return newCocktail;
      });

      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <View>
        <Text>Cocktails loading, pls wait...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Text>Cocktails by A to Z coming soon....</Text>
      {cocktails.map((cocktail) => {
        return (
          <Button
          key={cocktail.name}
            title={cocktail.name}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: cocktail.name,
                cocktailId: cocktail.id
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default CocktailsAZ;

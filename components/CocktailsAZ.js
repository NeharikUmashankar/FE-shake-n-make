import { getCocktailsByLetter } from "../api";
import { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const CocktailsAZ = ({ route,navigation }) => {
  const { letter } = route.params;

  const { over18 } = useContext(AdultContext);
  const { loggedUser } = useContext(UserContext);

  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);

  let adult;
  if (loggedUser) {
    adult = loggedUser.over18;
  } else {
    adult = over18;
  }

  useEffect(() => {
    getCocktailsByLetter(letter, adult).then(({ drinks }) => {
      setLoading(true);

      setCocktails((currCocktails) => {
        const newCocktail = [...currCocktails];

        for (let drink of drinks) {
          newCocktail.push({ name: drink.strDrink, id: drink.idDrink });
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
                cocktailId: cocktail.id,
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default CocktailsAZ;

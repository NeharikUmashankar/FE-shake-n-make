import { getCocktailsByLetter } from "../api";
import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
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
    <ScrollView className="bg-lightestBlue h-full">
      {cocktails.map((cocktail) => {
        return (
          <Pressable
            className="bg-mainBlue p-3 w-1/2 self-center rounded-full my-3"
            key={cocktail.name}
            title={cocktail.name}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: cocktail.name,
                cocktailId: cocktail.id,
              });
            }}
          >
            <Text className="text-center text-white">{cocktail.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default CocktailsAZ;

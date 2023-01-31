import { View, Text, ScrollView, Pressable } from "react-native";
import { getFilteredCocktails } from "../api";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const FilteredCocktails = ({ navigation }) => {
  const { ingredients } = navigation.state.params;
  const [filteredCocktailList, setFilteredCocktailList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { over18 } = useContext(AdultContext);
  const { loggedUser } = useContext(UserContext);

  let adult;
  if (loggedUser) {
    adult = loggedUser.over18;
  } else {
    adult = over18;
  }

  useEffect(() => {
    setIsLoading(true);
    getFilteredCocktails(ingredients, adult).then((drinks) => {
      setFilteredCocktailList((currList) => {
        let newList = [...drinks];
        return newList;
      });
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <View>
        <Text>Loading, please wait...</Text>
      </View>
    );

  if (filteredCocktailList.length === 0)
    return (
      <View>
        <Text>No drinks found. Please broaden your search or try a different ingredient</Text>
      </View>
    );

  return (
    <ScrollView className = 'bg-lightestBlue'>
      {filteredCocktailList.map((cocktail) => {
        return (
          <Pressable
          className = 'bg-mainBlue p-3 w-1/2 self-center rounded-full my-3'
            key={cocktail.idDrink}
            title={cocktail.strDrink}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: cocktail.strDrink,
                cocktailId: cocktail.idDrink,
              });
            }}
          ><Text className = 'text-center text-white'>{cocktail.strDrink}</Text></Pressable>
        );
      })}
    </ScrollView>
  );
};

export default FilteredCocktails;

import { View, Text, ScrollView, Button } from "react-native";
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
    <ScrollView>
      <Text>Here are your filtered cocktails:</Text>
      {filteredCocktailList.map((cocktail) => {
        return (
          <Button
            key={cocktail.idDrink}
            title={cocktail.strDrink}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: cocktail.strDrink,
                cocktailId: cocktail.idDrink,
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default FilteredCocktails;

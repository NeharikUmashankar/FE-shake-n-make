import { View, Text, ScrollView, Button } from "react-native";
import { getFilteredCocktails } from "../api";
import { useEffect,useState } from "react";

const FilteredCocktails = ({ navigation }) => {
  const { ingredients } = navigation.state.params;
  const [filteredCocktailList,setFilteredCocktailList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=> {
    setIsLoading(true);
    getFilteredCocktails(ingredients)
    .then((drinks) => {
      setFilteredCocktailList((currList) => {
        let newList = [...drinks]
        return newList
      })
      setIsLoading(false);
    })
  },[])

  if (isLoading)
    return (
      <View>
        <Text>Loading, please wait...</Text>
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

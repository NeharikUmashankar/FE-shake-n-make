import { View, Text } from "react-native";
import { getFilteredCocktails } from "../api";
import { useEffect } from "react";

const FilteredCocktails = ({ navigation }) => {
  const { ingredients, loading } = navigation.state.params;

  if (loading)
    return (
      <View>
        <Text>Loading, please wait...</Text>
      </View>
    );
  console.log(ingredients);

  return (
    <View>
      <Text>Filtered cocktails coming soon....</Text>
    </View>
  );
};

export default FilteredCocktails;

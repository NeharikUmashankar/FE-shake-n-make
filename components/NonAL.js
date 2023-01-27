import { View, Text, ScrollView, Button } from "react-native";
import { getNonAL } from "../api";
import { useState, useEffect } from "react";

const NonAL = ({ navigation }) => {
  const [nonAL, setNonAL] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNonAL().then((info) => {
      setLoading(true);
      setNonAL(info);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <View>
        <Text>Drinks loading, please wait...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Text>Non alcoholic drinks coming soon....</Text>
      {nonAL.map((drink) => {
        return (
          <Button
            title={drink.strDrink}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: drink.strDrink,
                cocktailId: drink.idDrink,
              });
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default NonAL;

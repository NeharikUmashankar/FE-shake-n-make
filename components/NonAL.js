import { View, Text, ScrollView, Pressable } from "react-native";
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
    <ScrollView className="bg-lightestBlue h-full">
      {nonAL.map((drink) => {
        return (
          <Pressable
            className="bg-mainBlue p-3 w-1/2 self-center rounded-full my-3"
            key={drink.strDrink}
            onPress={() => {
              navigation.navigate("Cocktail", {
                cocktailName: drink.strDrink,
                cocktailId: drink.idDrink,
              });
            }}
          >
            <Text className = 'text-white text-center'>{drink.strDrink}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default NonAL;

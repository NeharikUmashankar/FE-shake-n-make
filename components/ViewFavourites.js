import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { FavouritesContext } from "./FavouritesContext";
import { UserContext } from "./UserContext";
import { getFavouriteIngredients } from "../api";
import { getFavouriteMeasures } from "../api";
import { Text, View } from "react-native";
import ImageViewer from "./ImageViewer";
import DeleteButton from "./DeleteButton";

const ViewFavourites = () => {
  const { favouritesList, setFavouritesList } = useContext(FavouritesContext);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  if (typeof loggedUser === "object") {
    return (
      <ScrollView className = ''>
        <ScrollView horizontal={true} className="flex flex-row bg-lightestBlue border">
          {favouritesList.map((cocktail) => {
            const cocktailIngredients = getFavouriteIngredients(cocktail);
            const cocktailMeasures = getFavouriteMeasures(cocktail);
            return (
              <ScrollView className="bg-sky-100/40 m-4 p-4 w-96">
                <View>
                  <Text className="text-center text-xl bg-sky-100/30 w-3/5 self-center my-4 p-2 rounded-md">
                    {cocktail.title}
                  </Text>
                  <DeleteButton cocktail={cocktail} />
                </View>
                <View className="self-center">
                  <ImageViewer
                    placeholderImageSource={{ uri: cocktail.thumbnail }}
                  ></ImageViewer>
                </View>
                <Text className="bg-sky-100/30 mt-8 w-2/5 p-2 px-3 text-center self-center text-xl rounded-t-lg">
                  Ingredients
                </Text>
                <View className="bg-sky-100/30 p-4  w-3/5 self-center rounded-lg">
                  {cocktailIngredients.map((ingredient, i) => {
                    return (
                      <Text className="text-center" key={ingredient}>
                        {ingredient}: {cocktailMeasures[i]}{" "}
                      </Text>
                    );
                  })}
                </View>
                <Text className=" bg-sky-100/30 mt-8 w-2/6 text-center self-center text-xl p-2 rounded-t-lg"> Recipe</Text>
                <Text className = 'bg-sky-100/30 mx-6 p-4 text-center self-center h-fit rounded-lg'>{cocktail.instructions}</Text>
              </ScrollView>
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  }
};

export default ViewFavourites;

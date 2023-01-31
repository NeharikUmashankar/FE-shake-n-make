import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { FavouritesContext } from "./FavouritesContext";
import { UserContext } from "./UserContext";
import { getFavouriteIngredients } from "../api";
import { getFavouriteMeasures } from "../api";
import { Text,View } from "react-native";
import ImageViewer from "./ImageViewer";
import DeleteButton from "./DeleteButton";


const ViewFavourites = () => {
    const { favouritesList, setFavouritesList } = useContext(FavouritesContext)
    const { loggedUser, setLoggedUser } = useContext(UserContext)

    

    if (typeof loggedUser === "object") {
        return (
            <ScrollView horizontal={false}>
                {favouritesList.map((cocktail) => {
                    const cocktailIngredients = getFavouriteIngredients(cocktail)
                    const cocktailMeasures = getFavouriteMeasures(cocktail)
                    return (
                        <ScrollView>
                            <View>
                                <Text>{cocktail.title}</Text>
                                <DeleteButton cocktail={cocktail} />
                            </View>
                            <ImageViewer
                                placeholderImageSource={{ uri: cocktail.thumbnail }}
                            ></ImageViewer>
                            <Text>
                                Ingredients needed:
                                {cocktailIngredients.map((ingredient, i) => {
                                    return (
                                        <Text key={ingredient}>
                                            {ingredient}: {cocktailMeasures[i]}{" "}
                                        </Text>
                                    );
                                })}
                            </Text>
                            <Text> Recipe: {cocktail.instructions}</Text>
                        </ScrollView>

                    )



                })}

            </ScrollView>
        )
    }

}

export default ViewFavourites

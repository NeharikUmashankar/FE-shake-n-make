import { useState, useEffect } from "react"
import { useContext } from "react"
import { UserContext } from './UserContext'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { postCocktailToFavourites } from "../api"
import { FavouritesContext } from './FavouritesContext'
import { View,Text } from "react-native"




const FavouriteButton = ({cocktail}) => {
    const { favouritesList, setFavouritesList } = useContext(FavouritesContext)
    const { loggedUser, setLoggedUser } = useContext(UserContext)
    const [exists, setExists] = useState(false)

    useEffect(() => {
        let existingFavouritesByTitle = favouritesList.filter((element) => {
            return element.title === cocktail.strDrink
        })
        if (existingFavouritesByTitle.length !== 0) {
            setExists(true)
        }
    }, [favouritesList])

    const handleOnPress = () => {
        let existingFavouritesByTitle = favouritesList.filter((element) => {
            return element.title === cocktail.strDrink
        })
        if (existingFavouritesByTitle.length === 0) {
            
            postCocktailToFavourites(loggedUser.user_id, cocktail)
                .then((favouritedCocktail) => {
                    setFavouritesList((currList) => {
                        let newList = [...currList]
                        newList.push(favouritedCocktail)
                        return newList
                    })
                    alert(`You successfully favourited cocktail: ${favouritedCocktail.title}`)
                })
        }
    
    }

    if (typeof loggedUser !== "object") {
        return (<View></View>)
    } else if (exists === true) {
        return (
            <View>
                <Text className = 'text-xl text-center'>
                    ⭐
                </Text>
            </View>
        )
    } else {
        return (
            <View>
                <Pressable onPress={handleOnPress}>
                    <Text className = 'text-xl text-center'>
                        ☆
                    </Text>
                </Pressable>
            </View>
        )
    }

}

export default FavouriteButton
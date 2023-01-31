import { View, Text, Alert, StyleSheet } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { useState } from "react"
import { deleteCocktailById } from "../api"
import { useContext } from "react"
import { FavouritesContext } from "./FavouritesContext"

const DeleteButton = ({ cocktail }) => {
    const [alerted,setAlerted] = useState(false)
    const {favouritesList,setFavouritesList} = useContext(FavouritesContext)

    const handleOnPress = () => {
        alert("Are you sure you want to delete? Clicking the red exclamation mark will permanently delete this favourite.")
        setAlerted(true)

    }
    const handleDelete = () => {
        deleteCocktailById(cocktail.cocktail_id)
        .then((res) => {
            setFavouritesList((currList) => {
                let newList = [...currList]
                newList = newList.filter((element) => {
                    return element.cocktail_id !== cocktail.cocktail_id
                })
                return newList
            })
            alert(`Successfully deleted cocktail: ${cocktail.title}`)
            setAlerted(false)
        })

    }


    if (alerted) {return (
        <View style={styles.container}>
            <Pressable onPress={handleDelete}>
                <Text>
                    ❗
                </Text>
            </Pressable>
        </View>
    )
    } else {
        return (
            <View style={styles.container}>
            <Pressable onPress={handleOnPress}>
                <Text>
                    🗑️
                </Text>
            </Pressable>
        </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DeleteButton

// const showAlert = () => {
//     Alert.alert(
//         'Warning',
//         'This will permanently delete this cocktail from your favourites. Click ok to continue, or cancel to stop.'),
//         [{
//             text: 'Cancel',
//             onPress: () => Alert.alert('Cancel Pressed'),
//             style: 'cancel'
//         },
//         {
//             text: 'OK',
//             onPress: () => Alert.alert('OK Pressed'),
//         }
//         ],
//     {
//         cancelable: false
//     }
// }
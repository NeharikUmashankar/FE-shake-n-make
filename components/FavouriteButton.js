
import { useContext } from "react"
import {UserContext} from './UserContext'
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"

const handleOnPress = () => {
    
}

export default FavouriteButton = ({cocktail}) => {
    const { loggedUser,setLoggedUser } = useContext(UserContext)
    if (typeof loggedUser !== "object") {
        return (<View></View>)
    } else {
        return (
            <View>
                <Pressable onPress={handleOnPress}>
                    ⭐
                </Pressable>
            </View>
        )
    }

}
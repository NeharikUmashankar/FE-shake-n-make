import { View,StyleSheet } from "react-native"
import ImageViewer from "./ImageViewer"
import { useContext } from "react"
import { UserContext } from "./UserContext"
import { AdultContext } from "./AdultContext"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import {useNavigation} from '@react-navigation/native'
import { Text } from "react-native"

const Header = ({title}) => {
    const {over18,setOver18} = useContext(AdultContext)
    const navigation=useNavigation()
    const {loggedUser,setLoggedUser} = useContext(UserContext)
    const handleGuestOnPress = () => {
        navigation.navigate("Sign up")
    }
    const handleUserOnPress = () => {
        navigation.navigate("Favourites")
    }

    const handleHomeOnPress = () => {
        navigation.navigate("Home")
    }

    return (
        <View className="w-full">
        <View className="flex-row h-fit justify-around w-96 mb-3 p-1">
            <Pressable onPress={handleHomeOnPress}>
            <ImageViewer className="justify-start"
                placeholderImageSource={require('../assets/cocktail.png')}
                // {{uri: "https://freesvg.org/img/bar-15.png"}} 
                logo={true}
                >
            </ImageViewer>
            </Pressable>
            <Text className = 'text-xl w-2/5 text-center'>{title}</Text>
            <Pressable onPress={typeof loggedUser !== "object" ? handleGuestOnPress : handleUserOnPress }>
            <ImageViewer
            placeholderImageSource={typeof loggedUser!=="object" ? {uri: "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"}:(loggedUser.avatar ? {uri: loggedUser.avatar} : {uri: "https://www.pngitem.com/pimgs/m/272-2720607_this-icon-for-gender-neutral-user-circle-hd.png"})} logo={true}
            ></ImageViewer>
            </Pressable>
        </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    width: 50,
  },
});

export default Header;

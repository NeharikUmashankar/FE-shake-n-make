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
    const handleOnPress = () => {
        navigation.navigate("Profile")
    }
   

    return (
        <View className="flex-column w-full p-0 h-full">
        <View className="flex-row h-fit justify-around w-full mr-50 pr-50">
            <ImageViewer className="justify-start"
                placeholderImageSource={{uri: "https://freesvg.org/img/bar-15.png"}} logo={true}
                >
            </ImageViewer>
            <Text>{title}</Text>
            <Pressable onPress={handleOnPress}>
            <ImageViewer
            placeholderImageSource={typeof loggedUser!=="object" ? {uri: "https://images.macrumors.com/t/n4CqVR2eujJL-GkUPhv1oao_PmI=/1600x/article-new/2019/04/guest-user-250x250.jpg"}:(loggedUser.avatar ? {uri: loggedUser.avatar} : {uri: "https://www.pngitem.com/pimgs/m/272-2720607_this-icon-for-gender-neutral-user-circle-hd.png"})} logo={true}
            ></ImageViewer>
            </Pressable>
        </View>
        
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        width: 50,
    }
})

export default Header
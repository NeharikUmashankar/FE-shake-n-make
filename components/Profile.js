import { useContext } from "react"
import { UserContext } from "./UserContext"
import { AdultContext } from "./AdultContext"
import { Image } from "react-native"
import { View, Text } from "react-native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import ImageViewer from "./ImageViewer"

function Profile({ navigation }) {
    const { over18, setOver18 } = useContext(AdultContext)
    const { loggedUser, setLoggedUser } = useContext(UserContext)

    const handleGuestAgeChange = () => {
        navigation.navigate("Welcome")
    }
    const handleGuestSignUp = () => {
        navigation.navigate("Sign up")
    }

    const handleLogOut = () => {
        setLoggedUser(false)
        navigation.navigate("Welcome")
    }

    const handleEdit = () => {
        navigation.navigate("Edit")
    }
    if (typeof loggedUser !== "object") {

        return (
            <View className="flex-col items-center justify-center">
                <Text>
                    You are currently logged in as a guest who {over18 ? "is aged 18 or over." : "is not over age 18."} {"\n"}
                </Text>
                <Pressable onPress={handleGuestAgeChange}>
                    <Text className="flex-col h-auto text-center items-center justify-center border-2 border-solid border-black rounded-xl">Click to change age bracket.{"\n"}</Text>
                </Pressable>
                <Pressable onPress={handleGuestSignUp}>
                    <Text className="flex-col h-auto text-center items-center justify-center border-2 border-solid border-black rounded-xl">Click to sign-up.{"\n"}</Text>
                </Pressable>
            </View>
        )
    } else if (typeof loggedUser === "object") {
        return (
            <View className="flex-col items-center justify-center">
                <View className="w-full h-50 w-50 flex-row justify-between items-between">
                    <Pressable onPress={handleLogOut} className="overflow-hidden w-10 h-10 border-solid border-2 border-black rounded-lg">
                    <View className="flex-row justify-start items-center border-2 border-neutral-50 rounded-xl p-1">
                        <Image className="overflow-hidden w-10 h-10 border-solid border-2 border-black rounded-lg" source={{uri: "https://static.vecteezy.com/system/resources/thumbnails/006/693/054/small/logout-icon-template-black-color-editable-log-out-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg"}} />
                    <Text className="font-extrabold">Sign out</Text>
                    </View>
                    </Pressable>
                    <Pressable onPress={handleEdit} className="bg-white">
                    <View className="flex-row justify-end items-center border-2 border-neutral-50 rounded-xl p-1">
                    <Text className="font-extrabold">Edit user</Text>
                        <Text className="text-3xl bg-white rounded-lg">
                            ✏️
                        </Text>
                    </View>
                    </Pressable>
                </View>
                <View className="flex-row w-full justify-center"><Text className="flex-col items-center justify-center">
                    You are currently logged in as: {loggedUser.username} {"\n"}
                </Text>

                </View>
                <Text>Your avatar link is currently: {"\n"} {loggedUser.avatar ? loggedUser.avatar : "blank"} {"\n"}</Text>
                <ImageViewer className="justify-start"
                    placeholderImageSource={loggedUser.avatar ? { uri: loggedUser.avatar } : { uri: "https://www.pngitem.com/pimgs/m/272-2720607_this-icon-for-gender-neutral-user-circle-hd.png" }} logo={false}
                >
                </ImageViewer>
                <Text>
                    You are currently {loggedUser.over18 ? "aged 18 or over." : "under age 18."}{"\n"}
                </Text>
            


            </View>
        )
    }

}

export default Profile
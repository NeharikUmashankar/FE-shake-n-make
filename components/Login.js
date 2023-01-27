import { Text, Button, View,TextInput } from "react-native"
import { useState } from "react"
import { getUserByUsername } from "../api"
import { UserContext } from "./UserContext"
import { useContext } from "react"

const Login = ({navigation}) => {
    const { loggedUser, setLoggedUser } = useContext(UserContext)
    const [inputUsername,setInputUsername] = useState("")
    const [inputPassword,setInputPassword] = useState("")
    // const [invalidUser,setInvalidUser] = useState(false)
    // const [invalidPassword,setInvalidPassword] = useState(false)

    const handleOnPress = () => {
        getUserByUsername(inputUsername)
        .then((user) => {
            if (user.password !== inputPassword) {
                alert("Your password is invalid. Please try again.")
            } else {
                setLoggedUser(user)
            }
        })
        .then(() => {
            // navigation.navigate("Home")
        })
        .catch((err) => {
            if (+err.message.slice(-4) === 404) {
                alert("Your username is invalid. Please try again.")
            } 
        })

    }
    // if (invalidUser) {
    //     return (
    //         <View>
    //             <Text>Your username is invalid.  Click below to try again or to create an account.</Text>
    //             <Button title="Re-try"
    //                 onPress={() => {
    //                     setInvalidUser(false)
    //                 }}
    //                 >
    //             </Button>
    //             <Button title="Sign up">

    //             </Button>
    //         </View>
    //     )
    // } else if (invalidPassword) {
    //     return (
    //         <View>
    //             <Text>Your password is invalid.  Click below to try again.</Text>
    //             <Button title="Re-try" onPress={() => {
    //                 setInvalidPassword(false)
    //             }}></Button>
    //         </View>
    //     )
    // } else {
    return (
        <View>
            <Text>Please enter your username and password.</Text>
            <TextInput value={inputUsername} placeholder="username..." onChangeText={(inputText) => setInputUsername(inputText)}></TextInput>
            <TextInput secureTextEntry={true} value={inputPassword} onChangeText={(inputText) => setInputPassword(inputText)} placeholder="password..."></TextInput>
            <Button title="Submit" onPress={handleOnPress}></Button>
            <View>
                <Text>Not got an account? Click below to sign up.</Text>
                <Button title="Sign up"></Button>
            </View>
        </View>
    )
}
// }



export default Login
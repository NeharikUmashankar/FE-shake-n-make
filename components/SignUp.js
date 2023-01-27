import { View,TextInput,Text } from "react-native";
import { useState } from "react";
import { getUserByUsername } from "../api";
const SignUp = ({ navigation }) => {
    const [inputUsername,setInputUsername] = useState("")
    const [isError,setIsError] = useState({})

    const checkUsername = () => {
        getUserByUsername(inputUsername)
        .then((user) => {
            //username already exists -> sad path as username is unavailable
            setIsError({value:true,field:"username"})
        })
        .catch((err) => {
            //username does not exist -> happy path as username is available
            setIsError({value:false,field:""}) 
        })
    }
    return (
        <View>
            <Text>Please enter your details in the fields below then click submit.</Text>
            <Text>Username</Text>
            <TextInput className={isError.field === "username" ? "border-2 border-solid border-red-200" : "border-2 border-solid border-black-200"} value={inputUsername} onEndEditing={checkUsername} onChangeText={(inputText) => {setInputUsername(inputText)}}placeholder="e.g. TestUser1..."></TextInput>
        </View>
    )

}


export default SignUp;

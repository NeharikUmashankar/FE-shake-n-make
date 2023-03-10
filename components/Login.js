
import { Text, Button, View, TextInput, Pressable, StyleSheet, Image } from "react-native";

import { useState } from "react";
import { getUserByUsername } from "../api";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { FirstVisitContext } from "./FirstVisitContext";
import { getFavouritesByUserId } from "../api";
import { FavouritesContext } from "./FavouritesContext";
import Modal from 'react-native-modal'

const Login = ({ navigation }) => {
  const { setLoggedUser } = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { over18, setOver18 } = useContext(AdultContext);
  const { firstVisit, setFirstVisit } = useContext(FirstVisitContext)
  const { favouritesList, setFavouritesList } = useContext(FavouritesContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnPress = () => {
    setIsLoading(true)
    getUserByUsername(inputUsername)
      .then((user) => {
        setIsLoading(false)
        if (user.password !== inputPassword) {
            return Promise.reject({msg: "Your password is invalid. Please try again."});
        } else {
          alert(`You successfully logged in as ${user.username}`)
          setFirstVisit(false)
          setLoggedUser(user);
          setOver18(false);
          return getFavouritesByUserId(user.user_id)
        }
      })
      .then((cocktails) => {
        return setFavouritesList(cocktails)
      })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.msg !== undefined) {
        alert(err.msg)
        } else {
        if (+err.message.slice(-4) === 404) {
          alert("Your username is invalid. Please try again.");
        }
        }
      });
  };

  return (
   
    <View className="bg-lightestBlue h-full">
      <Modal isVisible={isLoading}>
        <View className="text-white rounded-3xl flex-column w-full h-full justify-center items-center  m-0 p-0 bg-[#537AB0] opacity-80">
          <Text className="text-white" style={styles.text}> Logging in...</Text>
          <Image className="w-25 h-25" source={require('../assets/Spinner-1s-200px.gif')}></Image>
        </View>
      </Modal>
      <View className="m-10 p-6 bg-sky-200/40 rounded-3xl my-10">
        <TextInput
          className="my-1 bg-sky-100/20 rounded-md border border-black pl-2"
          value={inputUsername}
          placeholder="username..."
          onChangeText={(inputText) => setInputUsername(inputText)}
        ></TextInput>
        <TextInput
          className="my-1 bg-sky-100/20 rounded-md border border-black pl-2"
          secureTextEntry={true}
          value={inputPassword}
          onChangeText={(inputText) => setInputPassword(inputText)}
          placeholder="password..."
        ></TextInput>
        <Pressable
          className="bg-mainBlue p-3 w-2/5 self-center rounded-full"
          title="Submit"
          onPress={handleOnPress}
        >
          <Text className="text-white text-center">Login</Text>
        </Pressable>
      </View>

      <View className="bg-sky-200/40 m-10 p-5 rounded-3xl">
        <Text className=" text-center m-3">Not got an account? Join us!</Text>
        <Pressable className="bg-mainBlue p-3 w-2/5 self-center rounded-full" onPress={() => navigation.navigate("Sign up")}>
          <Text className="text-center text-white">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};
// }

const styles = StyleSheet.create({

  text: {
    color: "white",
    fontSize: 50
  }
})

export default Login;

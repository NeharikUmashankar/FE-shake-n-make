import { Text, Button, View, TextInput } from "react-native";
import { useState } from "react";
import { getUserByUsername } from "../api";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { FirstVisitContext } from "./FirstVisitContext";
import { getFavouritesByUserId } from "../api";
import { FavouritesContext } from "./FavouritesContext";

const Login = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { over18, setOver18 } = useContext(AdultContext);
  const { firstVisit, setFirstVisit } = useContext(FirstVisitContext)
  const { favouritesList, setFavouritesList } = useContext(FavouritesContext)

  const handleOnPress = () => {
    getUserByUsername(inputUsername)
      .then((user) => {
        if (user.password !== inputPassword) {
          alert("Your password is invalid. Please try again.");
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
        console.log(err)
        if (+err.message.slice(-4) === 404) {
          alert("Your username is invalid. Please try again.");
        }
      });
  };

  return (
    <View>
      <Text>Please enter your username and password.</Text>
      <TextInput
        value={inputUsername}
        placeholder="username..."
        onChangeText={(inputText) => setInputUsername(inputText)}
      ></TextInput>
      <TextInput
        secureTextEntry={true}
        value={inputPassword}
        onChangeText={(inputText) => setInputPassword(inputText)}
        placeholder="password..."
      ></TextInput>
      <Button title="Submit" onPress={handleOnPress}></Button>
      <View>
        <Text>Not got an account? Click below to sign up.</Text>
        <Button title="Sign up" onPress={() => navigation.navigate("Sign up")}></Button>
      </View>
    </View>
  );
};
// }

export default Login;

import { Text, Button, View, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { getUserByUsername } from "../api";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";

const Login = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { over18, setOver18 } = useContext(AdultContext);

  const handleOnPress = () => {
    getUserByUsername(inputUsername)
      .then((user) => {
        if (user.password !== inputPassword) {
          alert("Your password is invalid. Please try again.");
        } else {
          setLoggedUser(user);
          setOver18(false);
          navigation.navigate("Home");
        }
      })
      .catch((err) => {
        if (+err.message.slice(-4) === 404) {
          alert("Your username is invalid. Please try again.");
        }
      });
  };

  return (
    <View className="bg-lightestBlue h-full">
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
        <Pressable className="bg-mainBlue p-3 w-2/5 self-center rounded-full">
          <Text className="text-center text-white">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};
// }

export default Login;

import { View, Text, Button } from "react-native";
import React from "react";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";


const LandingScreen = ({ navigation }) => {
  const {over18, setOver18} = useContext(AdultContext)

  return (
    <View>
      <Text>Are You Over 18? Click below to enter as a guest.</Text>
      <Button
        title="Yes"
        onPress={() => {
          setOver18(true)
          navigation.navigate("Home");
        }}
      ></Button>
      <Button
        title="No"
        onPress={() => {
          setOver18(false)
          navigation.navigate("Home");
        }}
      ></Button>
      <Text>Already a member? Click below to login.</Text>
      <Button title="Login" onPress={() => {
        navigation.navigate("Login")
      }}></Button>
    </View>
  );
};

export default LandingScreen;

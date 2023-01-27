import { View, Text, Button } from "react-native";
import React from "react";


const LandingScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Are You Over 18? Click below to enter as a guest.</Text>
      <Button
        title="Yes"
        onPress={() => {
          navigation.navigate("Home", { over18: true });
        }}
      ></Button>
      <Button
        title="No"
        onPress={() => {
          navigation.navigate("Home", { over18: false });
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

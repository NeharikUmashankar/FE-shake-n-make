import { View, Text, Button } from "react-native";
import React from "react";

const LandingScreen = ({ navigation }) => {
  const myTrueContext = React.createContext(false);
  const myFalseContext = React.createContext(true);

  return (
    <View>
      <Text>Are You Over 18?</Text>
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
    </View>
  );
};

export default LandingScreen;

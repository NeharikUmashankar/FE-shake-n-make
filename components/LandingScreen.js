import { View, Text, Button } from "react-native";
import React from "react";

// export let myTrueContext = false;

const LandingScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Are You Over 18?</Text>
      <Button
        title="Yes"
        onPress={() => {
          //   myTrueContext = true;
          navigation.navigate("Home", { over18: true });
        }}
      ></Button>
      <Button
        title="No"
        onPress={() => {
          //   myTrueContext = false;
          navigation.navigate("Home", { over18: false });
        }}
      ></Button>
    </View>
  );
};

export default LandingScreen;

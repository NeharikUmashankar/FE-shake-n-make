import { View, Text, Button } from "react-native";
import React from "react";
import { useContext,useEffect } from "react";
import { AdultContext } from "./AdultContext";
import { FirstVisitContext } from "./FirstVisitContext";

const LandingScreen = ({ navigation }) => {
  const {firstVisit,setFirstVisit} = useContext(FirstVisitContext)
  const { over18, setOver18 } = useContext(AdultContext);
  
  return (
    <View className="bg-lightestBlue h-full">
      <View className="p-3 my-5 w-3/5 self-center">
        <Text className="text-center m-3 text-color-darkestBlue">
          Are you over 18? Click below to enter as a guest.
        </Text>
        <Button
          title="Yes"
          onPress={() => {
            setFirstVisit(false)

            setOver18(true);
            navigation.navigate("Home");
          }}
        ></Button>
        <Button
          title="No"
          onPress={() => {
            setFirstVisit(false)

            setOver18(false);
            navigation.navigate("Home");
          }}
        ></Button>
      </View>

      <View className="p-3 my-5 w-3/5 self-center">
        <Text>Already a member? Click below to login.</Text>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        ></Button>
        <View>
          <Text>Not got an account? Click below to sign up.</Text>
          <Button
            onPress={() => {
              navigation.navigate("Sign up");
            }}
            title="Sign up"
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

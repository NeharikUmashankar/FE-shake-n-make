import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";

const LandingScreen = ({ navigation }) => {
  const { setOver18 } = useContext(AdultContext);

  return (
    <View className="bg-lightestBlue h-full">
      <View className="bg-sky-200/30 w-4/5 self-center m-4 mt-12 p-6 rounded-3xl">
        <Text className="text-center m-2 text-xl">
          Are you over 18? Click below to enter as a guest.
        </Text>
        <View className="flex flex-row self-center">
          <Pressable
            className="bg-mainBlue p-3 w-1/5 self-center rounded-full m-2"
            onPress={() => {
              setOver18(true);
              navigation.navigate("Home");
            }}
          >
            <Text className="text-buttonText text-center">Yes</Text>
          </Pressable>
          <Pressable
            className="bg-mainBlue  p-3 w-1/5 self-center rounded-full m-2"
            onPress={() => {
              setOver18(false);
              navigation.navigate("Home");
            }}
          >
            <Text className="text-white text-center">No</Text>
          </Pressable>
        </View>
      </View>

      <View className="bg-sky-200/25 p-3 my-5 m-5 w-4/5 self-center rounded-3xl">
        <Text className="text-center p-3 text-xl">Already a member?</Text>
        <Pressable
          className="bg-mainBlue mb-10 p-3 w-2/5 self-center rounded-full"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text className="text-buttonText text-center text-l">Login</Text>
        </Pressable>

        <View className="">
          <Text className="text-xl text-center">
            Not got an account? Join us!
          </Text>

          <Pressable
            className="bg-mainBlue m-3 p-3 w-2/5 self-center rounded-full"
            onPress={() => {
              navigation.navigate("Sign up");
            }}
          >
            <Text className="text-buttonText text-center text-l">Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});

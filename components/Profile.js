import { useContext } from "react";
import { UserContext } from "./UserContext";
import { AdultContext } from "./AdultContext";
import { Image } from "react-native";
import { View, Text, Pressable, ScrollView } from "react-native";
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import ImageViewer from "./ImageViewer";

function Profile({ navigation }) {
  const { over18, setOver18 } = useContext(AdultContext);
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const handleGuestAgeChange = () => {
    navigation.navigate("Welcome");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleGuestSignUp = () => {
    navigation.navigate("Sign up");
  };

  const handleLogOut = () => {
    setLoggedUser(false);
    navigation.navigate("Welcome");
  };

  const handleEdit = () => {
    navigation.navigate("Edit");
  };
  if (typeof loggedUser !== "object") {
    return (
      <View className="flex-col items-center justify-center bg-lightestBlue h-full ">
        <View className="bg-sky-200/30 p-4 m-4 rounded-3xl">
          <Text className="text-center px-1 text-xl">
            You are currently logged in as a guest who{" "}
            {over18 ? "is aged 18 or over." : "is not over age 18."} {"\n"}
          </Text>
          <Pressable
            className="bg-mainBlue rounded-3xl w-48 self-center p-1 pt-4 mb-3 px-3"
            onPress={handleGuestAgeChange}
          >
            <Text className="text-center text-white">
              Change age bracket{"\n"}
            </Text>
          </Pressable>
          <Pressable
            className="bg-mainBlue rounded-3xl w-48 self-center p-1 pt-4 mb-3 px-3"
            onPress={handleLogin}
          >
            <Text className="text-center text-white">Login{"\n"}</Text>
          </Pressable>
          <Pressable
            className="bg-mainBlue rounded-3xl w-48 self-center p-1 pt-4 mb-3 px-3"
            onPress={handleGuestSignUp}
          >
            <Text className="text-center text-white">Sign-up{"\n"}</Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (typeof loggedUser === "object") {
    return (
      <ScrollView className="bg-lightestBlue">


        <View className="flex-row justify-between">


          <Pressable
            onPress={handleLogOut}
            className="overflow-hidden h-12 m-2 bg-mainBlue rounded-lg">
            <View className="flex-row justify-start items-center rounded-xl p-1">
              <Image
                className="overflow-hidden w-10 h-10 border-solid border-2 border-black rounded-lg"
                source={{
                  uri: "https://static.vecteezy.com/system/resources/thumbnails/006/693/054/small/logout-icon-template-black-color-editable-log-out-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg",
                }}
              />
              <Text className="font-extrabold text-white mx-2">Sign out</Text>
            </View>
          </Pressable>



          <Pressable onPress={handleEdit} className="overflow-hidden h-12 m-2 bg-mainBlue rounded-lg">
            <View className="flex-row justify-end items-center rounded-xl p-1">
              <Text className="font-extrabold text-white mx-2">Edit user</Text>
              <Text className="text-3xl bg-white rounded-lg mt-0.5">✏️</Text>
            </View>
          </Pressable>


        </View>




        <View className = 'bg-sky-100/40 m-4 rounded-3xl pt-6'>
          <View className="flex-row w-full justify-center">
            <Text className="flex-col  justify-center text-xl px-2 text-center">
              You are currently logged in as <Text className = 'font-bold'>{loggedUser.username} </Text>{"\n"}
            </Text>
          </View>
          <Text className="text-xl text-center m-2">Your avatar </Text>

          <View className="self-center border border-black rounded-2xl">
            <ImageViewer
              placeholderImageSource={
                loggedUser.avatar
                  ? { uri: loggedUser.avatar }
                  : {
                      uri: "https://www.pngitem.com/pimgs/m/272-2720607_this-icon-for-gender-neutral-user-circle-hd.png",
                    }
              }
              logo={false}
            ></ImageViewer>
          </View>

        <Text className="self-center text-xl m-3">
          You are currently{" "}
          {loggedUser.over18 ? "aged 18 or over." : "under age 18."}
          {"\n"}
        </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Profile;

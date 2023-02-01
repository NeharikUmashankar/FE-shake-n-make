import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import { getUserByUsername } from "../api";
import { RadioGroup } from "react-native-radio-buttons-group";
import { postUser } from "../api";

const SignUp = ({ navigation }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputAvatar, setInputAvatar] = useState("");
  const [inputOver18, setInputOver18] = useState(false);
  const [isError, setIsError] = useState({});
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1",
      label: "18 or over",
      value: true,
    },
    {
      id: "2",
      label: "under 18",
      value: false,
    },
  ]);

  const handleSubmit = () => {
    const userObject = {};
    const checkUserPromise = new Promise((resolve, reject) => {
      getUserByUsername(inputUsername)
        .then((res) => {
          reject("username");
        })
        .catch((err) => {
          userObject.username = inputUsername;
          resolve();
        });
    });
    checkUserPromise
      .then(() => {
        if (inputPassword !== "") {
          userObject.password = inputPassword;
        }
        if (inputAvatar !== "") {
          userObject.avatar = inputAvatar;
        }
        let filteredButtons = radioButtons.filter((element) => {
          return element.selected === true;
        });
        if (filteredButtons.length === 0) {
          return Promise.reject("age");
        } else {
          if (filteredButtons[0].value) {
            userObject.over18 = true;
          } else {
            userObject.over18 = false;
          }
          return postUser(userObject);
        }
      })

      .then((res) => {
        alert(
          "You successfully created an account.  Please sign in to use our app"
        );
        navigation.navigate("Login");
      })
      .catch((err) => {
        if (err === "username") {
          alert("This username has already been taken.");
        } else if (err === "age") {
          alert("You did not select an age bracket.");
        } else if (err.message.slice(-3) === "400") {
          alert("You are missing a key field.  Please try again");
        }
      });
  };

  function printRadioButtonContents() {
    let results;
    results = radioButtons.filter((element) => {
      return element.selected === true;
    });
    console.log(results[0].value);
  }

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  const checkUsername = () => {
    return getUserByUsername(inputUsername)
      .then((user) => {
        //username already exists -> sad path as username is unavailable
        setIsError({ value: true, field: "username" });
      })
      .catch((err) => {
        //username does not exist -> happy path as username is available
        setIsError({ value: false, field: "" });
      });
  };

  const checkAvatar = () => {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    if (inputAvatar.length > 0) {
      let result = inputAvatar.match(regex);
      if (result === null) {
        setIsError({ value: true, field: "avatar" });
        alert(
          "Your avatar url should start with 'http://' or 'https://' and end with '.jpg/.png/.gif' "
        );
      } else {
        setIsError({ value: false, field: "" });
      }
    }
  };
  return (
    <View className="bg-lightestBlue h-full">
      <View className="bg-sky-200/30 m-4 p-4 rounded-3xl">
        <Text>Username</Text>
        <TextInput
          className={
            isError.field === "username"
              ? "mb-4 px-2 border-2 border-solid border-red-200 rounded-md bg-sky-100/20"
              : "mb-4 px-2 border-2 border-solid border-black-200 rounded-md bg-sky-100/20"
          }
          value={inputUsername}
          onEndEditing={checkUsername}
          onChangeText={(inputText) => {
            setInputUsername(inputText);
          }}
          placeholder="e.g. TestUser1..."
        ></TextInput>
        <Text>Password</Text>
        <TextInput
          placeholder="...make me strong"
          className="border-2 border-solid border-black-200 px-2 mb-4 bg-sky-100/20 rounded-md"
          onChangeText={(inputText) => {
            setInputPassword(inputText);
          }}
          value={inputPassword}
        ></TextInput>
        <Text>Avatar URL</Text>
        <TextInput
          placeholder="https://examplewebsite.com/my_avatar_image.jpg"
          className={
            isError.field === "avatar"
              ? "border-2 border-solid border-red-200 px-2 mb-4 bg-sky-100/20 rounded-md"
              : "border-2 border-solid border-black-200 px-2 mb-4 bg-sky-100/20 rounded-md"
          }
          onChangeText={(inputText) => {
            setInputAvatar(inputText);
          }}
          value={inputAvatar}
          onEndEditing={checkAvatar}
        ></TextInput>

        <View className = 'bg-sky-100/20 w-2/5 self-center rounded-lg p-3'>
          <Text className="text-center text-xl p-2">Age</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
          <Pressable className = 'bg-darkBlue rounded-xl w-3/5 self-center mt-4 p-2' title="Submit" onPress={handleSubmit}>
            <Text className = 'text-center text-white'>Submit</Text>
          </Pressable>
        </View>


      </View>
    </View>
  );
};

export default SignUp;

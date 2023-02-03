import { View, Text, TextInput, Pressable } from "react-native";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { RadioGroup } from "react-native-radio-buttons-group";
import { patchUserById } from "../api";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";

function Edit({ navigation }) {
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [selected, setSelected] = useState("");
  const [selectOptions, setSelectOptions] = useState([
    { key: 1, value: "Password" },
    { key: 2, value: "Avatar" },
    { key: 3, value: "Age bracket" },
  ]);
  const [passwordArr, setPasswordArr] = useState(["", ""]);
  const [forEdit, setForEdit] = useState([]);
  const [forSave, setForSave] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [errorArr, setErrorArr] = useState([]);
  const [existingPasswordInput, setExistingPasswordInput] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(true);
  const [isAvatarError, setIsAvatarError] = useState(true);
  const [newAvatar, setNewAvatar] = useState("");
  const [isRadioSelection, setIsRadioSelection] = useState(false);
  const [invalidExistingPassword, setInvalidExistingPassword] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
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
  const cancelUpdate = (element) => {
    setForSave((currArr) => {
      const newArr = [...currArr];
      const result = newArr.filter((child) => {
        return child !== element;
      });
      return result;
    });
    setForEdit((currArr) => {
      const newArr = [...currArr];
      const result = newArr.filter((child) => {
        return child !== element;
      });
      return result;
    });
    setNewUser((currUser) => {
      const refObj = {
        "Age bracket": "over18",
        "Password":"password",
        "Avatar":"avatar"
      }
      const newUser = { ...currUser };
      const label = refObj[element]
      delete newUser[label];
      return newUser;
    });
  };
  
  useEffect(() => {
    setForSave((currArr) => {
      const newArr = [...currArr];
      for (let x in newUser) {
        if (x === "avatar") {
          if (newArr.indexOf("Avatar") === -1) {
            newArr.push("Avatar");
          }
        } else if (x === "over18") {
          if (newArr.indexOf("Age bracket") === -1) {
            newArr.push("Age bracket");
          }
        } else if (x === "password") {
          if (newArr.indexOf("Password") === -1) {
            newArr.push("Password");
          }
        }
      }
      return newArr;
    });
  }, [newUser]);
  useEffect(() => {
    console.log(newUser, "<<new user");
  }, [newUser]);
  useEffect(() => {
    if (
      checkForError("password") === false &&
      passwordArr[0] !== "" &&
      passwordArr[1] !== ""
    ) {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(true);
    }
  }, [errorArr]);
  const handleConfirm = () => {
    patchUserById(loggedUser.user_id, newUser)
      .then(() => {
        setIsConfirming(false);
        setLoggedUser(false);
        alert("Update successful. Returning to login page.");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkPasswordStrength = (inputText) => {
    const regex =
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    const result = passwordArr[0].match(regex);
    if (result === null) {
      alert(
        "Your password does not have sufficient complexity. Please use a mixture of uppercase (2) lowercase(3) and 1 special character (!@#$&*) and 2 numbers"
      );
      if (checkForError("password", "strength") === false) {
        setErrorArr((currArr) => {
          const newArr = [...currArr];
          newArr.push({ field: "password", type: "strength" });
          return newArr;
        });
      }
    } else {
      setErrorArr((currArr) => {
        const newArr = [...currArr];
        console.log(currArr, "<<currArr");
        const index = newArr.findIndex(
          (element) =>
            element.field === "password" && element.type === "strength"
        );
        if (index !== -1) {
          newArr.splice(index, 1);
        }
        console.log(newArr, "<<newArr");
        return newArr;
      });
    }
  };
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    const result = printRadioButtonContents();
    if (result === "empty") {
      setIsRadioSelection(false);
    } else {
      setIsRadioSelection(true);
    }
  }
  function printRadioButtonContents() {
    let results;
    results = radioButtons.filter((element) => {
      return element.selected === true;
    });
    if (results.length === 0) {
      return "empty";
    } else {
      return results[0].value;
    }
  }
  const checkAvatar = () => {
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    if (newAvatar.length > 0) {
      let result = newAvatar.match(regex);
      if (result === null) {
        alert(
          "Your avatar url should start with 'http://' or 'https://' and end with '.jpg/.png/.gif' "
        );
        if (checkForError("avatar") === false) {
          setErrorArr((currArr) => {
            const newArr = [...currArr];
            newArr.push({ field: "avatar" });
            return newArr;
          });
          setIsAvatarError(true);
        }
      } else {
        setErrorArr((currArr) => {
          const newArr = [...currArr];
          const index = newArr.findIndex(
            (element) => element.field === "avatar"
          );
          if (index !== -1) {
            newArr.splice(index, 1);
          }
          return newArr;
        });
        setIsAvatarError(false);
      }
    }
  };
  const checkForError = (field, type = "none") => {
    let result;
    if (type === "none") {
      result = errorArr.filter((element) => {
        return element.field === field;
      });
    } else {
      result = errorArr.filter((element) => {
        return element.field === field && element.type === type;
      });
    }
    console.log(result, "<< result in checkForError");
    if (result.length !== 0) {
      return true;
    } else {
      return false;
    }
  };
  const checkPasswordsMatch = () => {
    if (passwordArr[0] !== passwordArr[1]) {
      alert("Your passwords do not match");
      if (checkForError("password", "match") === false) {
        setErrorArr((currArr) => {
          const newArr = [...currArr];
          newArr.push({ field: "password", type: "match" });
          return newArr;
        });
      }
    } else {
      setErrorArr((currArr) => {
        const newArr = [...currArr];
        const index = newArr.findIndex(
          (element) => element.field === "password" && element.type === "match"
        );
        if (index !== -1) {
          newArr.splice(index, 1);
        }
        return newArr;
      });
    }
  };
  const handleSelectItem = (val) => {
    setSelected(val);
    // setSelectOptions((currList) => {
    //     let newList = [...currList]
    //     newList = newList.filter((element) => {
    //         return element.value !== val
    //     })
    //     return newList
    // })
    setForEdit((currList) => {
      //   const newList = [...currList];
      //   if (newList.indexOf(val) === -1) {
      //     newList.push(val);
      //   }
      //   return newList;
      const newList = [val];
      return newList;
    });
  };
  return (
    <ScrollView className="bg-lightestBlue p-2">
      <View className="bg-sky-100/40 p-6 m- h-full rounded-2xl">
        <Text className="text-center m-4 p-2 w-80 self-center text-xl">
          What would you like to update?
        </Text>

        <SelectList
          setSelected={(val) => handleSelectItem(val)}
          data={selectOptions}
          save="value"
        ></SelectList>

        <View className="m-1 mt-6 border-2 border-black bg-sky-100/20 p-4 rounded-xl">
          {forEdit.map((item) => {
            if (item === "Password") {
              return (
                <View key={item}>
                  <Text className="text-lg">Enter new password</Text>
                  <TextInput
                    className="bg-sky-100/20 px-2 mt-2 mb-6 rounded-lg border border-black"
                    secureTextEntry={true}
                    value={passwordArr[0]}
                    onChangeText={(inputText) => {
                      setPasswordArr((currArr) => {
                        const newArr = [...currArr];
                        newArr[0] = inputText;
                        return newArr;
                      });
                    }}
                    onEndEditing={() => {
                      checkPasswordStrength();
                    }}
                  />
                  <Text className="text-lg">Enter new password again</Text>
                  <TextInput
                    className="bg-sky-100/20 px-2 mt-2 mb-6 rounded-lg border border-black"
                    secureTextEntry={true}
                    value={passwordArr[1]}
                    onChangeText={(inputText) => {
                      setPasswordArr((currArr) => {
                        const newArr = [...currArr];
                        newArr[1] = inputText;
                        return newArr;
                      });
                    }}
                    onEndEditing={(inputText) => {
                      checkPasswordsMatch();
                    }}
                  />
                  {isPasswordError === false && (
                    <View>
                      <Pressable
                        onPress={() => {
                          setNewUser((currUser) => {
                            const newUser = { ...currUser };
                            newUser.password = passwordArr[1];
                            return newUser;
                          });
                        }}
                      >
                        <Text className="self-center w-1/4 text-center border-2 border-black rounded-xl border-solid text-lg my-1 mb-5 bg-mainBlue text-white p-1">
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            } else if (item === "Avatar") {
              return (
                <View className="p-2 my-1">
                  <Text className="text-lg">
                    Enter your new avatar url:{"\n"}
                  </Text>
                  <TextInput
                    className="bg-sky-100/20 px-2 mb-6 rounded-lg border border-black"
                    value={newAvatar}
                    onEndEditing={() => {
                      checkAvatar();
                    }}
                    onChangeText={(inputText) => setNewAvatar(inputText)}
                    placeholder="https://example-url.jpg"
                  ></TextInput>
                  {isAvatarError === false && (
                    <View>
                      <Pressable
                        onPress={() => {
                          setNewUser((currUser) => {
                            const newUser = { ...currUser };
                            newUser.avatar = newAvatar;
                            return newUser;
                          });
                        }}
                      >
                        <Text className="self-center w-1/4 text-center border-2 border-black rounded-xl border-solid text-lg my-1 mb-5 bg-mainBlue text-white p-1">
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            } else if (item === "Age bracket") {
              return (
                <View>
                  <Text className="mb-4 mt-2 text-lg">
                    Choose your correct age bracket:
                  </Text>

                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={onPressRadioButton}
                  />
                  {isRadioSelection && (
                    <View>
                      <Pressable
                        onPress={() => {
                          setNewUser((currUser) => {
                            const newUser = { ...currUser };
                            newUser.over18 = printRadioButtonContents();
                            return newUser;
                          });
                        }}
                      >
                        <Text className="self-center w-1/4 text-center border-2 border-black rounded-xl border-solid text-lg my-4 bg-mainBlue text-white p-1">
                          Save
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            }
          })}
          {forSave.length !== 0 && (
            <View>
              <Modal isVisible={isConfirming}>
                <View
                  className={
                    invalidExistingPassword
                      ? "text-white rounded-3xl flex-column w-full h-full justify-center items-center  m-0 p-0 bg-[#FFBF00] opacity-80"
                      : "text-white rounded-3xl flex-column w-full h-full justify-center items-center  m-0 p-0 bg-[#98FB98] opacity-80"
                  }
                >
                  <Text className="text-white text-center" style={styles.text}>
                    {" "}
                    Enter old password to confirm and proceed to login page
                  </Text>

                  <TextInput
                    className="self-center w-60 mt-8 mb-2 rounded-lg bg-amber-50/80 px-2"
                    secureTextEntry={true}
                    value={existingPasswordInput}
                    onChangeText={(inputText) => {
                      setExistingPasswordInput(inputText);
                    }}
                    onEndEditing={() => {
                      if (existingPasswordInput !== loggedUser.password) {
                        setInvalidExistingPassword(true);
                      } else {
                        setInvalidExistingPassword(false);
                      }
                    }}
                  ></TextInput>

                  {invalidExistingPassword && (
                    <Text className="text-lg font-bold text-red-700">
                      Password is invalid
                    </Text>
                  )}
                  {!invalidExistingPassword &&
                    existingPasswordInput.length > 0 && (
                      <Pressable
                      className = 'bg-green-800 p-2 mt-2 rounded-lg'
                        onPress={() => {
                          handleConfirm();
                        }}
                      >
                        <Text className = 'text-white text-lg'>Submit</Text>
                      </Pressable>
                    )}
                  <Pressable
                    className="bg-amber-700/80 m-2 p-2 rounded-md mt-10"
                    onPress={() => {
                      navigation.replace("Edit");
                    }}
                  >
                    <Text className = 'text-center text-lg text-white'>Cancel update</Text>
                  </Pressable>
                </View>
              </Modal>
              <Text className="text-lg">Fields currently set to update:</Text>

              <View className="flex justify-center flex-row">
                {forSave.map((element) => {
                  return (
                    <View className="border border-black m-3 p-2 bg-lightBlue rounded-lg">
                      <Text className="text-center text-white">{element}</Text>
                      <Pressable
                        onPress={() => {
                          cancelUpdate(element);
                        }}
                      >
                        <Text className="text-center">🗑️</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>

              <Pressable
                className="bg-rose-600/80 w-2/5 p-2 mb-3 mt-8 self-center rounded-lg shadow border border-1"
                onPress={() => {
                  setIsConfirming(true);
                }}
              >
                <Text className="text-white text-center">Confirm</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "white",
    width: "100%",
  },
});

export default Edit;

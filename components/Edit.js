
import { View, Text, TextInput } from "react-native"
import { useContext, useEffect } from "react"
import { UserContext } from "./UserContext"
import { SelectList } from "react-native-dropdown-select-list"
import { useState } from "react"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import { RadioGroup } from "react-native-radio-buttons-group";
import { patchUserById } from "../api"
import Modal from 'react-native-modal'
import { StyleSheet } from "react-native"
import { ScrollView } from "react-native"

function Edit({ navigation }) {
    const { loggedUser, setLoggedUser } = useContext(UserContext)
    const [selected, setSelected] = useState("")
    const [selectOptions, setSelectOptions] = useState([
        { key: 1, value: "Password" },
        { key: 2, value: "Avatar" },
        { key: 3, value: "Age bracket" }
    ])
    const [passwordArr, setPasswordArr] = useState(["", ""])
    const [forEdit, setForEdit] = useState([])
    const [forSave, setForSave] = useState([])
    const [newUser, setNewUser] = useState({})
    const [errorArr, setErrorArr] = useState([])
    const [existingPasswordInput, setExistingPasswordInput] = useState("")
    const [isPasswordError, setIsPasswordError] = useState(true)
    const [isAvatarError, setIsAvatarError] = useState(true)
    const [newAvatar, setNewAvatar] = useState("")
    const [isRadioSelection, setIsRadioSelection] = useState(false)
    const [invalidExistingPassword, setInvalidExistingPassword] = useState(true)
    const [isConfirming, setIsConfirming] = useState(false)
    const [radioButtons, setRadioButtons] = useState([{
        id: '1',
        label: '18 or over',
        value: true
    }, {
        id: '2',
        label: 'under 18',
        value: false
    }
    ])
    const cancelUpdate = (element) => {
        setForSave((currArr) => {
            const newArr = [...currArr]
            const result = newArr.filter((child) => {
                return child !== element
            })
            return newArr
        })
        setForEdit((currArr) => {
            const newArr = [...currArr]
            const result = newArr.filter((child) => {
                return child !== element
            })
            return newArr
        })
        setNewUser((currUser) => {
            const newUser = { ...currUser }
            delete newUser.element
            return newUser
        })

    }
    useEffect(() => {
        setForSave((currArr) => {
            const newArr = [...currArr]
            for (let x in newUser) {
                if (x === "avatar") {
                    if (newArr.indexOf("Avatar") === -1) {
                        newArr.push("Avatar")
                    }
                } else if (x === "over18") {
                    if (newArr.indexOf("Age bracket") === -1) {

                        newArr.push("Age bracket")
                    }
                } else if (x === "password") {
                    if (newArr.indexOf("Password") === -1) {

                        newArr.push("Password")
                    }
                }
            }
            return newArr
        })
    }, [newUser])
    useEffect(() => {
        console.log(newUser, "<<new user")
    }, [newUser])
    useEffect(() => {
        if (checkForError("password") === false && passwordArr[0] !== "" && passwordArr[1] !== "") {
            setIsPasswordError(false)
        } else {
            setIsPasswordError(true)
        }
    }, [errorArr])
    const handleConfirm = () => {
        patchUserById(loggedUser.user_id, newUser)
            .then(() => {
                setIsConfirming(false)
                setLoggedUser(false)
                alert("Update successful. Returning to login page.")
                navigation.navigate("Login")
            })
            .catch((err) => {
                console.log(err)
            })


    }
    const checkPasswordStrength = (inputText) => {
        const regex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
        const result = passwordArr[0].match(regex)
        if (result === null) {
            alert('Your password does not have sufficient complexity. Please use a mixture of uppercase (2) lowercase(3) and 1 special character (!@#$&*) and 2 numbers')
            if (checkForError("password", "strength") === false) {
                setErrorArr((currArr) => {
                    const newArr = [...currArr]
                    newArr.push({ field: "password", type: "strength" })
                    return newArr
                })
            }
        } else {
            setErrorArr((currArr) => {
                const newArr = [...currArr]
                console.log(currArr, "<<currArr")
                const index = newArr.findIndex(element => element.field === "password" && element.type === "strength")
                if (index !== -1) {
                    newArr.splice(index, 1)
                }
                console.log(newArr, "<<newArr")
                return newArr
            })

        }
    }
    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray)
        const result = printRadioButtonContents()
        if (result === "empty") {
            setIsRadioSelection(false)
        } else {
            setIsRadioSelection(true)
        }

    }
    function printRadioButtonContents() {

        let results
        results = radioButtons.filter((element) => {
            return element.selected === true
        })
        if (results.length === 0) {
            return "empty"
        } else {
            return results[0].value
        }
    }
    const checkAvatar = () => {
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
        if (newAvatar.length > 0) {
            let result = newAvatar.match(regex)
            if (result === null) {
                alert("Your avatar url should start with 'http://' or 'https://' and end with '.jpg/.png/.gif' ")
                if (checkForError("avatar") === false) {

                    setErrorArr((currArr) => {
                        const newArr = [...currArr]
                        newArr.push({ field: "avatar" })
                        return newArr
                    })
                    setIsAvatarError(true)
                }
            } else {
                setErrorArr((currArr) => {
                    const newArr = [...currArr]
                    const index = newArr.findIndex(element => element.field === "avatar")
                    if (index !== -1) {
                        newArr.splice(index, 1)
                    }
                    return newArr
                })
                setIsAvatarError(false)
            }
        }
    }
    const checkForError = (field, type = "none") => {
        let result
        if (type === "none") {
            result = errorArr.filter((element) => {
                return element.field === field
            })
        } else {
            result = errorArr.filter((element) => {
                return element.field === field && element.type === type
            })
        }
        console.log(result, "<< result in checkForError")
        if (result.length !== 0) {
            return true
        } else {
            return false
        }

    }
    const checkPasswordsMatch = () => {
        if (passwordArr[0] !== passwordArr[1]) {
            alert('Your passwords do not match')
            if (checkForError("password", "match") === false) {

                setErrorArr((currArr) => {
                    const newArr = [...currArr]
                    newArr.push({ field: "password", type: "match" })
                    return newArr
                })
            }
        } else {
            setErrorArr((currArr) => {
                const newArr = [...currArr]
                const index = newArr.findIndex(element => element.field === "password" && element.type === "match")
                if (index !== -1) {
                    newArr.splice(index, 1)
                }
                return newArr
            })
        }
    }
    const handleSelectItem = (val) => {
        setSelected(val)
        // setSelectOptions((currList) => {
        //     let newList = [...currList]
        //     newList = newList.filter((element) => {
        //         return element.value !== val
        //     })
        //     return newList
        // })
        setForEdit((currList) => {
            const newList = [...currList]
            newList.push(val)
            return newList
        })
    }
    return (
        <ScrollView>
            <Text>What would you like to update?</Text>
            <SelectList setSelected={(val) => handleSelectItem(val)}
                data={selectOptions} save="value">

            </SelectList>
            <View>
                {forEdit.map((item) => {
                    if (item === "Password") {
                        return (
                            <View key={item}>
                                <Text>Enter new password.</Text>
                                <TextInput secureTextEntry={true}
                                    value={passwordArr[0]}
                                    onChangeText={
                                        (inputText) => {
                                            setPasswordArr((currArr) => {
                                                const newArr = [...currArr]
                                                newArr[0] = inputText
                                                return newArr
                                            })
                                        }}
                                    placeholder="enter new password..."
                                    onEndEditing={
                                        () => {
                                            checkPasswordStrength()
                                        }}
                                />
                                <Text>Enter new password again.</Text>
                                <TextInput secureTextEntry={true}
                                    value={passwordArr[1]}
                                    onChangeText={
                                        (inputText) => {
                                            setPasswordArr((currArr) => {
                                                const newArr = [...currArr]
                                                newArr[1] = inputText
                                                return newArr
                                            })
                                        }}
                                    placeholder="enter new password again..."
                                    onEndEditing={
                                        (inputText) => {
                                            checkPasswordsMatch()
                                        }}
                                />
                                {isPasswordError === false && (

                                    <View>
                                        <Pressable onPress={
                                            () => {
                                                setNewUser((currUser) => {
                                                    const newUser = { ...currUser }
                                                    newUser.password = passwordArr[1]
                                                    return newUser
                                                })
                                            }}>
                                            <Text className="w-50 h-50 border-2 border-black rounded-xl border-solid text-lg">Save</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>

                        )
                    } else if (item === "Avatar") {
                        return (
                            <View>
                                <Text>Enter your new avatar url.{"\n"}</Text>
                                <TextInput value={newAvatar}
                                    onEndEditing={
                                        () => {
                                            checkAvatar()
                                        }
                                    }
                                    onChangeText={
                                        (inputText) => setNewAvatar(inputText)
                                    }
                                    placeholder="https://example-url.jpg"></TextInput>
                                {isAvatarError === false && (

                                    <View>
                                        <Pressable onPress={
                                            () => {
                                                setNewUser((currUser) => {
                                                    const newUser = { ...currUser }
                                                    newUser.avatar = newAvatar
                                                    return newUser
                                                })
                                            }}>
                                            <Text className="w-50 h-50 border-2 border-black rounded-xl border-solid text-lg">Save</Text>
                                        </Pressable>
                                    </View>
                                )}

                            </View>

                        )
                    } else if (item === "Age bracket") {
                        return (
                            <View>
                                <Text>Choose your correct age bracket:</Text>
                                <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
                                {isRadioSelection && (
                                    <View>
                                        <Pressable onPress={
                                            () => {
                                                setNewUser((currUser) => {
                                                    const newUser = { ...currUser }
                                                    newUser.over18 = printRadioButtonContents()
                                                    return newUser
                                                })
                                            }}>
                                            <Text className="w-50 h-50 border-2 border-black rounded-xl border-solid text-lg">Save</Text>
                                        </Pressable>
                                    </View>
                                )}

                            </View>
                        )
                    }
                })}
                {forSave.length !== 0 && (
                    <View>
                        <Modal isVisible={isConfirming}>
                            <View className={invalidExistingPassword ? "text-white rounded-3xl flex-column w-full h-full justify-center items-center  m-0 p-0 bg-[#FFBF00] opacity-80" : "text-white rounded-3xl flex-column w-full h-full justify-center items-center  m-0 p-0 bg-[#98FB98] opacity-80"}>
                                <Text className="text-white" style={styles.text}> Enter previous password to confirm and proceed to login page.</Text>
                                <TextInput secureTextEntry={true} style={styles.textInput} value={existingPasswordInput} onChangeText={(inputText) => { setExistingPasswordInput(inputText) }} onEndEditing={
                                    () => {

                                        if (existingPasswordInput !== loggedUser.password) {
                                            alert("Password is invalid.  Please retry")
                                            setInvalidExistingPassword(true)
                                        } else {
                                            setInvalidExistingPassword(false)
                                        }
                                    }
                                }></TextInput>
                                {invalidExistingPassword && (
                                    <Text>Password is invalid</Text>
                                )}
                                {(!invalidExistingPassword && existingPasswordInput.length > 0) && (
                                    <Pressable onPress={() => {
                                        handleConfirm()
                                    }}>
                                        <Text>Submit</Text>
                                    </Pressable>
                                )}
                                <Pressable onPress={() => {navigation.replace("Edit")}}>
                                    <Text>
                                        Cancel update
                                    </Text>
                                </Pressable>
                            </View>
                        </Modal>
                        <Text>Fields currently set to update:</Text>
                        {forSave.map((element) => {
                            return (
                                <View>
                                    <Text>
                                        {element}
                                    </Text>
                                    <Pressable onPress={() => { cancelUpdate(element) }}>
                                        <Text>🗑️</Text>
                                    </Pressable>
                                </View>
                            )
                        })}

                        <Pressable onPress={() => { setIsConfirming(true) }}>
                            <Text>
                                Confirm
                            </Text>
                        </Pressable>

                    </View>
                )}

            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({

    text: {
        color: "white",
        fontSize: 20
    },
    textInput: {
        backgroundColor: 'white',
        width: '100%'
    }
})

export default Edit
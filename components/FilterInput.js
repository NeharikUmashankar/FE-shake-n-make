import { View, StyleSheet, TextInput, Text, Pressable, } from "react-native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const FilterInput = ({ navigation }) => {
  const [text, setText] = useState("");
  const [sumbittedText, setSubmittedText] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);

  //gin, dry vermouth, anis

  const { over18 } = useContext(AdultContext);
  const { loggedUser } = useContext(UserContext);

  let adult;
  if (loggedUser) {
    adult = loggedUser.over18;
  } else {
    adult = over18;
  }

  const handlePress = () => {
    setSubmittedText(text);
    setFirstLoad(false);
  };

  useEffect(() => {
    if (!firstLoad) {
      navigation.navigate("Filtered Cocktails", { ingredients: sumbittedText });
    }
  }, [sumbittedText]);

  return (
    <View className="bg-sky-200/25 m-5 p-4 rounded-3xl">
      <Text className = 'text-center'>
        Filter by Ingredient. Please list ingredients separated by a comma.
      </Text>
      <TextInput
      className = 'bg-sky-100/20 rounded-l'
        style={styles.input}
        onChangeText={(inputText) => {
          setText(inputText);
        }}
        value={text}
        placeholder={adult ? "Gin, Vodka, Orange" : "Coffee, sugar"}
      ></TextInput>
      <Pressable className="bg-mainBlue m-2 p-3 w-2/5 self-center rounded-full" title="Submit" onPress={handlePress}>
        <Text className = 'text-white text-center'>Filter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default FilterInput;

import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AdultContext } from "./AdultContext";
import { UserContext } from "./UserContext";

const FilterInput = ({ navigation }) => {
  const [text, setText] = useState("");
  const [sumbittedText, setSubmittedText] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);

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
    <View>
      <Text>Filter by Ingredient. Please list ingredients separated by a comma.</Text>
      <TextInput
        style={styles.input}
        onChangeText={(inputText) => {
          setText(inputText);
        }}
        value={text}
        placeholder={adult ? "Gin, Vodka, Orange" : "Coffee, sugar"}
      ></TextInput>
      <Button title="Submit" onPress={handlePress}></Button>
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

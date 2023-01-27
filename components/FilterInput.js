import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useEffect, useState } from "react";

const FilterInput = ({ navigation }) => {
  const [text, setText] = useState("");
  const [sumbittedText, setSubmittedText] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);

  const handlePress = () => {
    setSubmittedText(text);
    setFirstLoad(false)
  };

  useEffect(() => {
    if (!firstLoad) {
      navigation.navigate("Filtered Cocktails", { ingredients: sumbittedText });
    }
  }, [sumbittedText]);



  return (
    <View>
      <Text>Filter by Ingredient</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(inputText) => {
          setText(inputText);
        }}
        value={text}
        placeholder="Gin, Vodka, Orange"
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

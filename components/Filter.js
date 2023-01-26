import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { useState } from "react";

const Filter = ({ navigation }) => {
  const [text, setText] = useState("");
  const [sumbittedText, setSubmittedText] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(false);
    setSubmittedText(text);
    setLoading(true);
    // navigation.navigate("Filtered Cocktails", { ingredients: sumbittedText });
  };

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

export default Filter;

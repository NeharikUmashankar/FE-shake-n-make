import { View, Text, Button, ScrollView } from "react-native";

const Alphabet = ({ navigation }) => {
  const Handler = () => {
    navigation.navigate("Cocktails by Alphabet");
  };
  return (
    <ScrollView>
      <Button title="A" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"A"})
      }} />
      <Button title="B" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"B"})
      }} />
      <Button title="C" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"C"})
      }} />
      <Button title="C" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"D"})
      }} />
      <Button title="E" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"E"})
      }} />
      <Button title="F" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"F"})
      }} />
      <Button title="G" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"G"})
      }} />
      <Button title="H" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"H"})
      }} />
      <Button title="I" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"I"})
      }} />
      <Button title="J" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"J"})
      }} />
      <Button title="K" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"K"})
      }} />
      <Button title="L" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"L"})
      }} />
      <Button title="M" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"M"})
      }} />
      <Button title="N" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"N"})
      }} />
      <Button title="O" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"O"})
      }} />
      <Button title="P" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"P"})
      }} />
      <Button title="Q" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Q"})
      }} />
      <Button title="R" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"R"})
      }} />
      <Button title="S" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"S"})
      }} />
      <Button title="T" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"T"})
      }} />
      <Button title="U" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"U"})
      }} />
      <Button title="V" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"V"})
      }} />
      <Button title="W" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"W"})
      }} />
      <Button title="X" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"X"})
      }} />
      <Button title="Y" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Y"})
      }} />
      <Button title="Z" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Z"})
      }} />
    </ScrollView>
  );
};

export default Alphabet;
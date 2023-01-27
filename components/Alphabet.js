import { View, Text, Button, ScrollView } from "react-native";

const Alphabet = ({ navigation }, props) => {

      console.log(props)
      const {over18} = navigation.state.params
  const Handler = () => {
    navigation.navigate("Cocktails by Alphabet");
  };
  return (
    <ScrollView>
      <Button title="A" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"A", over18:over18})
      }} />
      <Button title="B" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"B", over18:over18})
      }} />
      <Button title="C" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"C", over18:over18})
      }} />
      <Button title="D" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"D", over18:over18})
      }} />
      <Button title="E" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"E", over18:over18})
      }} />
      <Button title="F" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"F", over18:over18})
      }} />
      <Button title="G" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"G", over18:over18})
      }} />
      <Button title="H" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"H", over18:over18})
      }} />
      <Button title="I" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"I", over18:over18})
      }} />
      <Button title="J" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"J", over18:over18})
      }} />
      <Button title="K" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"K", over18:over18})
      }} />
      <Button title="L" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"L", over18:over18})
      }} />
      <Button title="M" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"M", over18:over18})
      }} />
      <Button title="N" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"N", over18:over18})
      }} />
      <Button title="O" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"O", over18:over18})
      }} />
      <Button title="P" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"P", over18:over18})
      }} />
      <Button title="Q" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Q", over18:over18})
      }} />
      <Button title="R" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"R", over18:over18})
      }} />
      <Button title="S" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"S", over18:over18})
      }} />
      <Button title="T" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"T", over18:over18})
      }} />
      <Button title="U" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"U", over18:over18})
      }} />
      <Button title="V" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"V", over18:over18})
      }} />
      <Button title="W" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"W", over18:over18})
      }} />
      <Button title="X" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"X", over18:over18})
      }} />
      <Button title="Y" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Y", over18:over18})
      }} />
      <Button title="Z" onPress={() => {
            navigation.navigate("Cocktails by Alphabet", {letter:"Z", over18:over18})
      }} />
    </ScrollView>
  );
};

export default Alphabet;


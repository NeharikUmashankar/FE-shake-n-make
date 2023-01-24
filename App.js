import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RandomCocktails from './components/RandomCocktails';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Shake n Make!</Text>
      <RandomCocktails/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

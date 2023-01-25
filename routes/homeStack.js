import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../components/HomeScreen";
import RandomCocktails from "../components/RandomCocktails";
import RandomButton from "../components/RandomButton";
import CocktailsAZ from "../components/CocktailsAZ";
import Cocktail from "../components/Cocktail";

const screens = {
  Home: {
    screen: HomeScreen,
  },
  'Random cocktail': {
    screen: RandomCocktails,
  },

  'Cocktails by Alphabet': {
    screen: CocktailsAZ,
  },

  'Cocktail' : {
    screen: Cocktail
  }
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../components/HomeScreen";
import RandomCocktails from "../components/RandomCocktails";
import RandomButton from "../components/RandomButton";
import CocktailsAZ from "../components/CocktailsAZ";
import Cocktail from "../components/Cocktail";
import Alphabet from "../components/Alphabet";
import LandingScreen from "../components/LandingScreen";

const screens = {
  'Welcome':{
    screen: LandingScreen,
  },

  'Home': {
    screen: HomeScreen,
  },
  'Random cocktail': {
    screen: RandomCocktails,
  },

  'Alphabet List': {
    screen: Alphabet,
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

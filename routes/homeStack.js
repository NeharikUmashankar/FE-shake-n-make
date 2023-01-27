import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../components/HomeScreen";
import RandomCocktails from "../components/RandomCocktails";
import CocktailsAZ from "../components/CocktailsAZ";
import Cocktail from "../components/Cocktail";
import Alphabet from "../components/Alphabet";
import LandingScreen from "../components/LandingScreen";
import NonAL from "../components/NonAL";
import FilteredCocktails from "../components/FilteredCocktails";
import FilterInput from "../components/FilterInput";

const screens = {
  Welcome: {
    screen: LandingScreen,
  },

  Home: {
    screen: HomeScreen,
  },

  "Virgin?": {
    screen: NonAL,
  },

  "Random cocktail": {
    screen: RandomCocktails,
  },

  "Alphabet List": {
    screen: Alphabet,
  },

  "Cocktails by Alphabet": {
    screen: CocktailsAZ,
  },

  Cocktail: {
    screen: Cocktail,
  },

  'Filter Input': {
    screen: FilterInput,
  },

  "Filtered Cocktails": {
    screen: FilteredCocktails,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

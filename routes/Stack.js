import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../components/HomeScreen";
import RandomCocktails from "../components/RandomCocktails";
import CocktailsAZ from "../components/CocktailsAZ";
import Cocktail from "../components/Cocktail";
import Alphabet from "../components/Alphabet";
import LandingScreen from "../components/LandingScreen";
import NonAL from "../components/NonAL";
import FilteredCocktails from "../components/FilteredCocktails";
import Accelerometer from "../components/Accelerometer";
import FilterInput from "../components/FilterInput";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ViewFavourites from "../components/ViewFavourites";
import Header from "../components/Header";
import { white } from "tailwindcss/colors";
const Stack = createNativeStackNavigator();
// export default createAppContainer(HomeStack);
export default MyStack = ({ name, navigation }) => {
  // console.log(name,"<<insideStack")
  return (
    <Stack.Navigator initialRouteName={name}>
      <Stack.Screen
        name="Welcome"
        component={LandingScreen}
        options={{
          headerStyle : {
            backgroundColor: '#ffffff'
          },
          headerBackVisible: false,
          headerTitle: (props) => <Header className="" title="Welcome" />,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Home" />,
        }}
      />
      <Stack.Screen
        name="Virgin?"
        component={NonAL}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Non-alcoholic cocktails" />,
        }}
      />
      <Stack.Screen
        name="Random cocktail"
        component={RandomCocktails}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Random cocktail" />,
        }}
      />
      <Stack.Screen
        name="Alphabet List"
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Alphabet List" />,
        }}
      >
        {(props) => <Alphabet {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Cocktails by Alphabet"
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Cocktails by Letter" />,
        }}
      >
        {(props) => <CocktailsAZ {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Cocktail"
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Cocktail" />,
        }}
      >
        {(props) => <Cocktail {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Filter Input"
        component={FilterInput}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header />,
        }}
      />
      <Stack.Screen
        name="Filtered Cocktails"
        component={FilteredCocktails}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Filtered cocktails" />,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Login" />,
        }}
      />
      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="Sign up" />,
        }}
      />
      <Stack.Screen
        name="Favourites"
        component={ViewFavourites}
        options={{
          headerBackVisible: false,
          headerTitle: (props) => <Header title="My favourites" />,
        }}
      />
    </Stack.Navigator>
  );
};

// const screens = {
//   Welcome: {
//     screen: LandingScreen,
//   },

//   Home: {
//     screen: HomeScreen,
//   },

//   "Virgin?": {
//     screen: NonAL,
//   },

//   "Random cocktail": {
//     screen: RandomCocktails,
//   },

//   "Alphabet List": {
//     screen: Alphabet,
//   },

//   "Cocktails by Alphabet": {
//     screen: CocktailsAZ,
//   },

//   Cocktail: {
//     screen: Cocktail,
//   },

//   'Filter Input': {
//     screen: FilterInput,
//   },

//   "Filtered Cocktails": {
//     screen: FilteredCocktails,
//   },
//   "Login": {
//     screen: Login,
//   },
//   "Sign up": {
//     screen: SignUp,
//   }
// };

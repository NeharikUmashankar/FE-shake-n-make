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

const Stack = createNativeStackNavigator();
// export default createAppContainer(HomeStack);
export default MyStack = ({name}) => {
    // console.log(name,"<<insideStack")
    return (
        <Stack.Navigator initialRouteName={name}>
            <Stack.Screen name="Welcome" component={LandingScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Virgin?" component={NonAL}/>
            <Stack.Screen name="Random cocktail" component={RandomCocktails}/>
            <Stack.Screen name="Alphabet List" >
                {(props) => <Alphabet {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Cocktails by Alphabet">
                {(props) => <CocktailsAZ {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Cocktail" >
                {(props) => <Cocktail {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Filter Input" component={FilterInput}/>
            <Stack.Screen name="Filtered Cocktails" component={FilteredCocktails}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Sign up" component={SignUp}/>
            <Stack.Screen name="Favourites" component={ViewFavourites}/>
            
        
        </Stack.Navigator>
    )
}

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



import { NavigationContainer } from "@react-navigation/native";
// import Navigator from "./routes/homeStack";
import { useEffect, useState } from "react";
import { UserContext } from "./components/UserContext";
import { AdultContext } from "./components/AdultContext";
import { FavouritesContext } from "./components/FavouritesContext";
import { FirstVisitContext } from './components/FirstVisitContext'
import TabNavigator from "./routes/Tab";
import { SplashScreen } from "./components/SplashScreen";

console.disableYellowBox = true;

export default function App() {
  const [loggedUser, setLoggedUser] = useState(false);
  const [over18, setOver18] = useState(false);
  const [letter, setLetter] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailId, setCocktailId] = useState("");
  const [firstVisit, setFirstVisit] = useState(true)
  const [favouritesList, setFavouritesList] = useState([])
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  },[]);

  return (
    <SplashScreen isAppReady={isAppReady}> 
      <FavouritesContext.Provider value={{favouritesList,setFavouritesList}}>
    <FirstVisitContext.Provider value={{firstVisit,setFirstVisit}}>
      <AdultContext.Provider value={{ over18, setOver18 }}>
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
          <NavigationContainer>

            <TabNavigator />

          </NavigationContainer>
        </UserContext.Provider>
      </AdultContext.Provider>
    </FirstVisitContext.Provider>
    </FavouritesContext.Provider>
    </SplashScreen>
  );
}

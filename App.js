import { NavigationContainer } from "@react-navigation/native";
// import Navigator from "./routes/homeStack";
import { useState } from "react";
import { UserContext } from "./components/UserContext";
import { AdultContext } from "./components/AdultContext";
import { FavouritesContext } from "./components/FavouritesContext";
import { FirstVisitContext } from './components/FirstVisitContext'
import TabNavigator from "./routes/Tab";


export default function App() {
  const [loggedUser, setLoggedUser] = useState(false);
  const [over18, setOver18] = useState(false);
  const [letter, setLetter] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [cocktailId, setCocktailId] = useState("");
  const [firstVisit, setFirstVisit] = useState(true)
  const [favouritesList, setFavouritesList] = useState([])

  return (
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
  );
}

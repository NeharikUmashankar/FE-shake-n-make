import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Navigator from "./routes/homeStack";
import { useState } from "react";
import { UserContext } from "./components/UserContext";
import { AdultContext } from "./components/AdultContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedUser, setLoggedUser] = useState(false);
  const [over18, setOver18] = useState(false);

  return (
    <AdultContext.Provider value={{ over18, setOver18 }}>
      <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
        <Navigator />
      </UserContext.Provider>
    </AdultContext.Provider>
  );
}

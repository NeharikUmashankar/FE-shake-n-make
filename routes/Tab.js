import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Stack from "./Stack"
const Tab = createBottomTabNavigator()
import { FirstVisitContext } from "../components/FirstVisitContext";
import { useContext } from "react";

export default function TabNavigator() {
    const {firstVisit,setFirstVisit} = useContext(FirstVisitContext)
    // console.log(firstVisit,"<<insideTabNavigator")
    let route= (firstVisit?  "Welcome" : "Home")
    // console.log(route,"<<insideTabNavigator")
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Welcome" >
                {() => <Stack name="Welcome" />}
            </Tab.Screen>
            <Tab.Screen name="Home" >
                {() => <Stack name="Home" />}
            </Tab.Screen>
            <Tab.Screen name="Random" >
                {() => <Stack name="Random cocktail" />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}
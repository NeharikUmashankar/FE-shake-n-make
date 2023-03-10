import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Stack from "./Stack"
const Tab = createBottomTabNavigator()
import { FirstVisitContext } from "../components/FirstVisitContext";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Image } from "react-native";

export default function TabNavigator() {
    const { firstVisit, setFirstVisit } = useContext(FirstVisitContext)
    const { loggedUser, setLoggedUser } = useContext(UserContext)
    // console.log(firstVisit,"<<insideTabNavigator")
    let route = (firstVisit ? "Welcome" : "Home")
    // console.log(route,"<<insideTabNavigator")
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Cocktails" options={{tabBarIcon: ({size, focused, color}) => {
                return (
                    <Image style={{width:size, height:size}} source={{uri: 'https://d1nhio0ox7pgb.cloudfront.net/_img/i_collection_png/256x256/plain/cocktail.png'}}/>
                )
            }}}>
                {() => <Stack name="Cocktails" />}
            </Tab.Screen>
            <Tab.Screen name="Home" options={{tabBarIcon: ({size, focused, color}) => {
                return (
                    <Image style={{width:size, height:size}} source={{uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828879.png'}}/>
                )
            }}}>
                {() => <Stack name="Home" />}
            </Tab.Screen>
            <Tab.Screen name="Random" options={{tabBarIcon: ({size, focused, color}) => {
                return (
                    <Image style={{width:size, height:size}} source={{uri: 'https://icons.iconarchive.com/icons/iconsmind/outline/512/Dice-2-icon.png'}}/>
                )
            }}}>
                {() => <Stack name="Random cocktail" />}
            </Tab.Screen>
            {typeof loggedUser === "object" && (
                <Tab.Screen name="Favourites" options={{tabBarIcon: ({size, focused, color}) => {
                    return (
                        <Image style={{width:size, height:size}} source={{uri: 'https://cdn.icon-icons.com/icons2/2768/PNG/512/star_icon_176624.png'}}/>
                    )
                }}}>
                    {() => <Stack name="Favourites" />}
                </Tab.Screen>
            )
            }
        </Tab.Navigator>
    )
}
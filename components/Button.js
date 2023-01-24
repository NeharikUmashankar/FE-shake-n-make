import { Button } from "react-native"
import navigation from 


export default function RandomButton ({navigation}){
    return (
        <Button 
        title='Random Cocktail' 
        onPress={() => {
            navigation.navigate('Random Cocktail')
        }}
        />
    )}



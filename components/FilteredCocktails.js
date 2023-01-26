import { View ,Text} from "react-native"
import { getFilteredCocktails } from "../api"

const FilteredCocktails = ({navigation}) => {
    const {ingredients} = navigation.state.params
    getFilteredCocktails(ingredients)
    return (
        <View>
            <Text>
        Filtered cocktails coming soon....
            </Text>
        </View>
    )
}

export default FilteredCocktails
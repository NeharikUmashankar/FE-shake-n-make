import axios from "axios";

const underDrink = {"idDrink":"12560","strDrink":"Afterglow","strDrinkAlternate":null,"strTags":null,"strVideo":null,"strCategory":"Cocktail","strIBA":null,"strAlcoholic":"Non alcoholic","strGlass":"Highball Glass","strInstructions":"Mix. Serve over ice.","strInstructionsES":"Mezcla. Servir con hielo.","strInstructionsDE":"Mischen. Auf Eis servieren.","strInstructionsFR":null,"strInstructionsIT":"Servire con ghiaccio.Mescolare.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/vuquyv1468876052.jpg","strIngredient1":"Grenadine","strIngredient2":"Orange juice","strIngredient3":"Pineapple juice","strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"1 part ","strMeasure2":"4 parts ","strMeasure3":"4 parts ","strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":null,"strImageAttribution":null,"strCreativeCommonsConfirmed":"No","dateModified":"2016-07-18 22:07:32"}

const cocktailAPI = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export const getRandomCocktail = (adult = false) => {
 if (adult) {
   return cocktailAPI.get("/random.php").then(({ data }) => {
    // console.log(underDrink)
    // console.log(data.drinks[0])
     return data.drinks[0];
   });
 } else {
  return cocktailAPI.get("/lookup.php?i=12560").then(({ data }) => {
    console.log(adult)
    // console.log(underDrink)
    // console.log(data.drinks[0])
     return data.drinks[0];
 })
}}

export const getCocktailIngredients = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("Ingredient")) {
      result.push(drink[element]);
    }
  }
  return result;
};

export const getCocktailsByLetter = (letter) => {
  return cocktailAPI.get(`/search.php?f=${letter}`).then(({data}) => {
    return data;
  })

}

export const getCocktailById = ({cocktailId}) => {
  console.log(cocktailId)
  return cocktailAPI.get(`/lookup.php?i=${cocktailId}`).then(({data}) => {
    return data.drinks[0]
  })
}

export const getCocktailMeasures = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("Measure")) {
      result.push(drink[element]);
    }
  }
  return result;
};

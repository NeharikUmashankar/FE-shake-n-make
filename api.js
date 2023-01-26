import axios from "axios";

const cocktailAPI = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export const getRandomCocktail = (adult = false) => {
  if (adult) {
    return cocktailAPI.get("/random.php").then(({ data }) => {
      return data.drinks[0];
    });
  } else {
    return cocktailAPI
      .get("/filter.php?a=Non_Alcoholic")
      .then(({ data }) => {
        console.log(data.drinks.length);
        const randomIndex = Math.floor(Math.random() * data.drinks.length);
        return data.drinks[randomIndex].idDrink;
      })
      .then((idDrink) => {
        return cocktailAPI.get(`/lookup.php?i=${idDrink}`).then(({ data }) => {
          return data.drinks[0];
        });
      });
  }
};

//https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12560
export const getCocktailIngredients = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("Ingredient")) {
      result.push(drink[element]);
    }
  }
  return result;
};

export const getCocktailsByLetter = (letter, adult = false) => {
  return cocktailAPI.get(`/search.php?f=${letter}`).then(({ data }) => {
    if (adult) {
      return data;
    }
   else {
    const result = []
    for (let cocktail of data.drinks ){
      console.log(cocktail.strAlcoholic)
      if (cocktail.strAlcoholic === 'Non alcoholic') {
        result.push(cocktail)
      }
    }
    return {"drinks":result}
   }
  });
};

export const getCocktailById = ({ cocktailId }) => {
  return cocktailAPI.get(`/lookup.php?i=${cocktailId}`).then(({ data }) => {
    return data.drinks[0];
  });
};

export const getCocktailMeasures = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("Measure")) {
      result.push(drink[element]);
    }
  }
  return result;
};

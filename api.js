import axios from "axios";

const cocktailAPI = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export const getRandomCocktail = () => {
  return cocktailAPI.get("/random.php").then(({ data }) => {
    return data.drinks[0];
  });
};

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

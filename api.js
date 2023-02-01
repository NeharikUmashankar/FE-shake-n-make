import axios from "axios";

const cocktailAPI = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v2/9973533",
});

const databaseAPI = axios.create({
  baseURL: "https://shake-n-make.onrender.com/api",
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

export const getCocktailIngredients = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("Ingredient")) {
      result.push(drink[element]);
    }
  }
  return result;
};

export const getFavouriteIngredients = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("ingredient")) {
      result.push(drink[element]);
    }
  }
  return result;
};

export const getCocktailsByLetter = (letter, adult = false) => {
  return cocktailAPI.get(`/search.php?f=${letter}`).then(({ data }) => {
    if (adult) {
      return data;
    } else {
      const result = [];
      for (let cocktail of data.drinks) {
        if (cocktail.strAlcoholic === "Non alcoholic") {
          result.push(cocktail);
        }
      }
      return { drinks: result };
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
export const getFavouriteMeasures = (drink) => {
  const result = [];
  for (let element in drink) {
    if (drink[element] && element.includes("measure")) {
      result.push(drink[element]);
    }
  }
  return result;
};

export const getNonAL = () => {
  return cocktailAPI.get("/filter.php?a=Non_Alcoholic").then(({ data }) => {
    return data.drinks;
  });
};

export const getFilteredCocktails = (ingredient, adult = false) => {
  if (ingredient.length === 0) {
    return "No ingredients provided";
  }
  let url = `/filter.php?i=`;
  const splitIng = ingredient.split(",");

  for (let item of splitIng) {
    if (item.startsWith(" ")) {
      item = item.slice(1);
    }
    if (item.endsWith(" ")) {
      item = item.slice(0, -1);
    }
    item.replace(" ", "_");
    url += `${item},`;
  }
  if (adult) {
    return cocktailAPI.get(url.slice(0, -1)).then(({ data }) => {
      return data.drinks;
    });
  } else {
    return cocktailAPI
      .get(url.slice(0, -1))
      .then(({ data }) => {
        return data.drinks;
      })
      .then((drinks) => {
        let promiseArray = [];
        for (let drink of drinks) {
          promiseArray.push(cocktailAPI.get(`/lookup.php?i=${drink.idDrink}`));
        }
        return Promise.all(promiseArray);
      })
      .then((promiseResults) => {
        const finalResults = promiseResults.filter((element) => {
          return element.data.drinks[0].strAlcoholic === "Non alcoholic";
        });
        const filteredResults = finalResults.map((element) => {
          return element.data.drinks[0];
        });
        return filteredResults;
      });
  }
};

export const getUserByUsername = (username) => {
  return databaseAPI.get(`/users/u/${username}`).then(({ data: { user } }) => {
    return user;
  });
};

export const postUser = (userObject) => {
  return databaseAPI.post('/users',userObject)
  .then((res) => {
    return "success"
  })
}

export const postCocktailToFavourites = (userId,cocktail) => {
  return databaseAPI.post(`/users/${userId}/cocktails`,cocktail)
  .then(({data:{cocktail}}) => {
    return cocktail
  })
}

export const getFavouritesByUserId = (userId) => {
  return databaseAPI.get(`users/${userId}/cocktails`)
  .then(({data:{cocktails}}) => {
    return cocktails
  })
}


export const deleteCocktailById = (cocktail_id) => {
  return databaseAPI.delete(`/cocktails/${cocktail_id}`)
  .then(() => {
    return "success"
  })
}
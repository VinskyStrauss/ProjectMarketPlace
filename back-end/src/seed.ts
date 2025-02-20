/* import { response } from "express";
import { connectDatabase, SM } from ".";
import { Category } from "./entities/Category";
import { Ingredient } from "./entities/Ingredient";
import { Recipe } from "./entities/Recipe";
import { RecipeIngredient } from "./entities/RecipeIngredient";

const categoryNum = 5;
const recipeNum = 20;

//require dotenv
require("dotenv").config();
const seed = async () => {
  await connectDatabase();
  //crerate categories
  const categories: Category[] = [];

  for (let i = 0; i < categoryNum; i++) {
    const newCategory = new Category();
    newCategory.name = `Category ${i}`;
    categories.push(newCategory);
  }
  await SM.categoryRepository.save(categories);

  //fetch API from Rapid Tasty
  const axios = require("axios");

  const options = {
    method: "GET",
    url: process.env.TASTY_API_URL,
    params: {
      from: "0",
      size: "20",
    },
    headers: {
      "X-RapidAPI-Key": "b8b6b16f15msh01058e9ab1e6dd6p194067jsn81aec1a7bee8",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    //create recipes
    const recipes: Recipe[] = [];
    //array for ingredients
    const ingredients: Ingredient[] = [];
    //array for recipeIngredients
    const recipeIngredients: RecipeIngredient[] = [];
    for (let i = 0; i < recipeNum; i++) {
      const newRecipe = new Recipe();
      newRecipe.recipe_name = response.data.results[i].name;
      newRecipe.recipe_rating = Math.floor(Math.random() * 5) + 1;
      newRecipe.recipe_description =
        response.data.results[i].description || "description";
      newRecipe.recipe_directions =
        response.data.results[i].instructions
          .map((instruction: any) => instruction.display_text)
          .join("\n") || "directions";
      newRecipe.recipe_link =
        response.data.results[i].original_video_url || "link";
      newRecipe.image_url =
        response.data.results[i].thumbnail_url || "Recipe Image";
      newRecipe.category = categories[i % categoryNum];
      recipes.push(newRecipe);
      await SM.recipeRepository.save(recipes);
      if (response.data.results[i].sections[0] != undefined) {
        if (response.data.results[i].sections[0].components.length != 0) {
          //create list of ingredients objects
          for (
            let j = 0;
            j < response.data.results[i].sections[0].components.length;
            j++
          ) {
            //object for ingredients
            const newIngredient = new Ingredient();
            newIngredient.ingredient_name =
              response.data.results[i].sections[0].components[j].ingredient
                .name || "name";
            newIngredient.ingredient_unit =
              response.data.results[i].sections[0].components[j].measurements[0]
                .unit.name || "unit";
            newIngredient.ingredient_description = "description";
            newIngredient.ingredient_link = "link";
            //check if the ingredient is already in the ingredients array
            ingredients.some((ingredient) => {
              if (ingredient.ingredient_name == newIngredient.ingredient_name) {
                return true;
              }
            })
              ? console.log("ingredient already exists")
              : ingredients.push(newIngredient);
            await SM.ingredientRepository.save(ingredients);
            //create recipeIngredients for the recipe
            const existIngredient = ingredients.find(
              (ingredient) =>
                ingredient.ingredient_name == newIngredient.ingredient_name
            );
            const newRecipeIngredient = new RecipeIngredient();
            newRecipeIngredient.recipe = newRecipe;
            newRecipeIngredient.ingredient = existIngredient!;
            newRecipeIngredient.ingredient_amount =
              response.data.results[i].sections[0].components[j].measurements[0]
                .quantity || "amount";
            recipeIngredients.push(newRecipeIngredient);
            await SM.recipeIngredientRepository.save(recipeIngredients);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log("Database seeded!");
};

seed();
 */

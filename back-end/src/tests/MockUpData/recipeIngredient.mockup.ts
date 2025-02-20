import { RecipeIngredient } from "../../entities/RecipeIngredient";
import { newRecipe } from "./recipe.mockup";
import { newIngredient } from "./ingredient.mockup";

export const newRecipeIngredient: RecipeIngredient = {
  id: 1,
  recipe: newRecipe,
  ingredient: newIngredient,
  ingredient_amount: "1",
};

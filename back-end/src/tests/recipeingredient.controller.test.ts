import Request from "supertest";
import { expect } from "chai";
import { newRecipeIngredient } from "./MockUpData/recipeIngredient.mockup";
import { Ingredient } from "../entities/Ingredient";
import { newIngredient } from "./MockUpData/ingredient.mockup";
import { newRecipe } from "./MockUpData/recipe.mockup";
import { Recipe } from "../entities/Recipe";

describe("RecipeIngredientController", () => {
  const baseURL = "localhost:3000/RecipeIngredients";
  var localRecipeIngredientID = "";
  var localRecipeIngredientName = "";
  var localRecipeID = "";
  var localAmount = "";
  const randomRecipeIngredientID = "36248179";
  var localIngredient: Ingredient;
  var localRecipe: Recipe;

  //create a recipe first
  before((done) => {
    Request("localhost:3000/recipes")
      .post("/")
      .send(newRecipe)
      .end((err, res) => {
        localRecipe = res.body;
        if (err) throw err;
        done();
      });
  });

  //create an ingredient first
  before((done) => {
    Request("localhost:3000/ingredients")
      .post("/")
      .send(newIngredient)
      .end((err, res) => {
        localIngredient = res.body;
        if (err) throw err;
        done();
      });
  });

  //delete the ingredient
  after((done) => {
    Request("localhost:3000/ingredients")
      .delete("/delete/" + localIngredient.id)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //delete the recipe
  after((done) => {
    Request("localhost:3000/recipes")
      .delete("/delete/" + localRecipe.id)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it("can create a new RecipeIngredient", (done) => {
    Request(baseURL)
      .post("/")
      .send({
        recipe: localRecipe,
        ingredient: localIngredient,
        ingredient_amount: newRecipeIngredient.ingredient_amount,
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.recipe.id).to.be.equal(localRecipe.id);
        expect(res.body.ingredient.id).to.be.equal(localIngredient.id);
        expect(res.body.ingredient_amount).to.be.equal(
          newRecipeIngredient.ingredient_amount
        );
        if (err) {
          throw err;
        }
        localRecipeIngredientID = res.body.id;
        localRecipeID = res.body.recipe.id;
        localAmount = res.body.ingredient_amount;
        done();
      });
  });

  it("can not create a new RecipeIngredient with the same recipe and ingredient", (done) => {
    Request(baseURL)
      .post("/")
      .send({
        recipe: localRecipe,
        ingredient: localIngredient,
        ingredient_amount: newRecipeIngredient.ingredient_amount,
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can get an existing RecipeIngredient by id", (done) => {
    Request(baseURL)
      .get("/" + localRecipeIngredientID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localRecipeIngredientID);
        expect(res.body.ingredient_amount).to.be.equal(localAmount);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not get a non-existing RecipeIngredient by id", (done) => {
    Request(baseURL)
      .get("/" + randomRecipeIngredientID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can get all RecipeIngredients", (done) => {
    Request(baseURL)
      .get("/")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can update an existing RecipeIngredient", (done) => {
    Request(baseURL)
      .put("/put/" + localRecipeIngredientID)
      .send({
        ingredient_amount: "100",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localRecipeIngredientID);
        expect(res.body.ingredient_amount).to.be.equal("100");
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not update a non-existing RecipeIngredient", (done) => {
    Request(baseURL)
      .put("/put/" + randomRecipeIngredientID)
      .send(newRecipeIngredient)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can delete an existing RecipeIngredient", (done) => {
    Request(baseURL)
      .delete("/delete/" + localRecipeIngredientID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(204);
        if (err) {
          throw err;
        }
        done();
      });
  });
});

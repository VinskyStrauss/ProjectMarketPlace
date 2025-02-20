import Request from "supertest";
import { newRecipe } from "./MockUpData/recipe.mockup";
import { expect } from "chai";
import { newIngredient } from "./MockUpData/ingredient.mockup";
import { Ingredient } from "../entities/Ingredient";

describe("RecipeController", () => {
  const baseURL = "localhost:3000/recipes";
  const recipeIngredientURL = "localhost:3000/RecipeIngredients";
  var localRecipe = newRecipe;
  var localRecipeName = "";
  const randomRecipeID = "36248179";
  const randomRecipeName = "ayam goreng";
  var localIngredient: Ingredient = newIngredient;
  var localrecipeIngredientID = "";

  before((done) => {
    Request("localhost:3000/ingredients")
      .post("/")
      .send({
        ingredient_name: "test",
        ingredient_unit: "test",
        ingredient_description: "test",
        ingredient_link: "test",
      })
      .end((err, res) => {
        localIngredient = res.body;
        if (err) throw err;
        done();
      });
  });

  after((done) => {
    Request("localhost:3000/ingredients")
      .delete("/delete/" + localIngredient.id)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it("can create a new recipe", (done) => {
    Request(baseURL)
      .post("/")
      .send(newRecipe)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.recipe_name).to.be.equal(newRecipe.recipe_name);
        expect(res.body.recipe_rating).to.be.equal(newRecipe.recipe_rating);
        expect(res.body.recipe_description).to.be.equal(
          newRecipe.recipe_description
        );
        expect(res.body.recipe_directions).to.be.equal(
          newRecipe.recipe_directions
        );
        expect(res.body.recipe_link).to.be.equal(newRecipe.recipe_link);
        expect(res.body.image_url).to.be.equal(newRecipe.image_url);
        if (err) {
          throw err;
        }
        localRecipe = res.body;
        localRecipeName = res.body.recipe_name;
        done();
      });
  });

  it("can not create a new recipe with the same name", (done) => {
    Request(baseURL)
      .post("/")
      .send(newRecipe)
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

  it("can get an existing recipe by id", (done) => {
    Request(baseURL)
      .get("/get/" + localRecipe.id)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localRecipe.id);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not get a non existing recipe by id", (done) => {
    Request(baseURL)
      .get("/get/" + randomRecipeID)
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

  it("can get an existing recipe by name", (done) => {
    Request(baseURL)
      .get("/name/" + localRecipeName)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.recipe_name).to.be.equal(localRecipeName);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not get a non existing recipe by name", (done) => {
    Request(baseURL)
      .get("/name/" + randomRecipeName)
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

  it("can add an existing ingredient to a recipe", (done) => {
    Request(recipeIngredientURL)
      .post("/")
      .send({
        recipe: localRecipe,
        ingredient: localIngredient,
        ingredient_amount: 1,
      })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.ingredients).to.be.not.null;
        if (err) {
          throw err;
        }
        localrecipeIngredientID = res.body.id;
        done();
      });
  });

  it("can remove an existing ingredient from a recipe", (done) => {
    Request(recipeIngredientURL)
      .delete("/delete/" + localrecipeIngredientID)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(204);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can update an existing recipe by id", (done) => {
    Request(baseURL)
      .put("/put/" + localRecipe.id)
      .send({
        recipe_name: "Recipe Test Name edited",
        recipe_description: "Recipe Test Name Description edited",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.recipe_name).to.be.equal("Recipe Test Name edited");
        expect(res.body.recipe_description).to.be.equal(
          "Recipe Test Name Description edited"
        );
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can delete an existing recipe by id", (done) => {
    Request(baseURL)
      .delete("/delete/" + localRecipe.id)
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

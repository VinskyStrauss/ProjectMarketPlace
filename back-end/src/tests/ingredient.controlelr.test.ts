import Request from "supertest";
import { expect } from "chai";
import { newIngredient } from "./MockUpData/ingredient.mockup";

describe("IngredientController", () => {
  const baseURL = "localhost:3000/ingredients";
  var localIngredientID = "";
  var localIngredientName = "";
  const randomIngredientID = "36248179";

  it("can create a new Ingredient", (done) => {
    Request(baseURL)
      .post("/")
      .send(newIngredient)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.ingredient_name).to.be.equal(
          newIngredient.ingredient_name
        );
        expect(res.body.ingredient_description).to.be.equal(
          newIngredient.ingredient_description
        );
        expect(res.body.ingredient_link).to.be.equal(
          newIngredient.ingredient_link
        );
        expect(res.body.ingredient_unit).to.be.equal(
          newIngredient.ingredient_unit
        );
        if (err) {
          throw err;
        }
        localIngredientID = res.body.id;
        localIngredientName = res.body.ingredient_name;
        done();
      });
  });

  it("can not create a new Ingredient with the same name", (done) => {
    Request(baseURL)
      .post("/")
      .send(newIngredient)
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

  it("can get an existing Ingredient by id", (done) => {
    Request(baseURL)
      .get("/" + localIngredientID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localIngredientID);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not get a non existing Ingredient by id", (done) => {
    Request(baseURL)
      .get("/" + randomIngredientID)
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

  it("can update an existing Ingredient by id", (done) => {
    Request(baseURL)
      .put("/put/" + localIngredientID)
      .send({
        ingredient_name: "Ingredient Test Name edited",
        ingredient_unit: "Ingredient Test Name Unit edited",
        ingredient_description: "Ingredient Test Name Description edited",
        ingredient_link: "Ingredient Test Name Link edited",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.ingredient_name).to.be.equal(
          "Ingredient Test Name edited"
        );
        expect(res.body.ingredient_description).to.be.equal(
          "Ingredient Test Name Description edited"
        );
        expect(res.body.ingredient_unit).to.be.equal(
          "Ingredient Test Name Unit edited"
        );
        expect(res.body.ingredient_link).to.be.equal(
          "Ingredient Test Name Link edited"
        );
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can delete an existing Ingredient by id", (done) => {
    Request(baseURL)
      .delete("/delete/" + localIngredientID)
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

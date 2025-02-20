import Request from "supertest";
import { expect } from "chai";
import { newCategory } from "./MockUpData/category.mockup";

describe("CategoryController", () => {
  const baseURL = "localhost:3000/categories";
  var localCategoryID = "";
  var localCategoryName = "";
  const randomCategoryID = "36248179";

  it("can create a new Category", (done) => {
    Request(baseURL)
      .post("/")
      .send(newCategory)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.name).to.be.equal(newCategory.name);
        if (err) {
          throw err;
        }
        localCategoryID = res.body.id;
        localCategoryName = res.body.name;
        done();
      });
  });

  it("can not create a new Category with the same name", (done) => {
    Request(baseURL)
      .post("/")
      .send(newCategory)
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

  it("can get an existing Category by id", (done) => {
    Request(baseURL)
      .get("/" + localCategoryID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localCategoryID);
        expect(res.body.name).to.be.equal(localCategoryName);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can not get a non-existing Category by id", (done) => {
    Request(baseURL)
      .get("/" + randomCategoryID)
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

  it("can get all Categories", (done) => {
    Request(baseURL)
      .get("/")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can update an existing Category", (done) => {
    Request(baseURL)
      .put("/put/" + localCategoryID)
      .send({ name: "Updated Category" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal("Updated Category");
        if (err) {
          throw err;
        }
        done();
      });
  });

  it("can delete an existing Category", (done) => {
    Request(baseURL)
      .delete("/delete/" + localCategoryID)
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

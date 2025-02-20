import Request from "supertest";
import { expect } from "chai";
import { mockProduct } from "./MockUpData/product.mockup";

describe("ProductController", () => {
  const baseURL = "localhost:3000/products";
  var localProductID = "";
  var localProductName = "";
  const randomProductID = "36248179";
  it("can create a new Product", (done) => {
    Request(baseURL)
      .post("/")
      .send(mockProduct)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.product_name).to.be.equal(mockProduct.product_name);
        if (err) {
          throw err;
        }
        localProductID = res.body.id;
        localProductName = res.body.name;
        done();
      });
  });
  it("can get an existing Product by id", (done) => {
    Request(baseURL)
      .get("/" + localProductID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localProductID);
        expect(res.body.name).to.be.equal(localProductName);
        if (err) {
          throw err;
        }
        done();
      });
  });
  it("can not get a non-existing Product by id", (done) => {
    Request(baseURL)
      .get("/" + randomProductID)
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
  it("can get all Products", (done) => {
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
  it("can update an existing Product", (done) => {
    Request(baseURL)
      .put("/put/" + localProductID)
      .send({ name: "Updated Product" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.product_name).to.be.equal("Updated Product");
        if (err) {
          throw err;
        }
        done();
      });
  });
  it("can delete an existing Product", (done) => {
    Request(baseURL)
      .delete("/delete/" + localProductID)
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

import Request from "supertest";
import { expect } from "chai";
import { mockUser } from "./MockUpData/user.mockup";

describe("UserController", () => {
  const baseURL = "localhost:3000/users";
  var localUserID = "";
  var localUserName = "";
  const randomUserID = "36248179";
  it("can create a new User", (done) => {
    Request(baseURL)
      .post("/")
      .send(mockUser)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(201);
        expect(res.body.id).to.be.not.null;
        expect(res.body.user_name).to.be.equal(mockUser.user_name);
        if (err) {
          throw err;
        }
        localUserID = res.body.id;
        localUserName = res.body.name;
        done();
      });
  });
  it("can not create a new User with the same name", (done) => {
    Request(baseURL)
      .post("/")
      .send(mockUser)
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
  it("can get an existing User by id", (done) => {
    Request(baseURL)
      .get("/" + localUserID)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.id).to.be.equal(localUserID);
        expect(res.body.name).to.be.equal(localUserName);
        if (err) {
          throw err;
        }
        done();
      });
  });
  it("can not get a non-existing User by id", (done) => {
    Request(baseURL)
      .get("/" + randomUserID)
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
  it("can get all Users", (done) => {
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
  it("can update an existing User", (done) => {
    Request(baseURL)
      .put("/put/" + localUserID)
      .send({ name: "Updated User" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.user_name).to.be.equal("Updated User");
        if (err) {
          throw err;
        }
        done();
      });
  });
  it("can delete an existing User", (done) => {
    Request(baseURL)
      .delete("/delete/" + localUserID)
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

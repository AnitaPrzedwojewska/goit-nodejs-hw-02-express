require('dotenv').config();
const { DB_HOST: URI_DB } = process.env;

const {
  describe,
  beforeAll,
  afterAll,
  expect,
  test
} = require("@jest/globals");
const supertest = require('supertest');

const db = require('../../src/db/db');
const User = require("../../src/models/users-schema");

const app = require('../../src/app');

describe("Users controller", () => {
  beforeAll(() => {
    db.connect(URI_DB);
    console.log("Connected to DB");
  });

  // registerUser ==================================================
  test("register user", async () => {
    const res = await supertest(app)
      .post("/api/users/signup")
      .send({ email: "user2@wp.pl", password: "password2" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({ message: "User registered" });
  });

  // loginUser ==================================================
  // test("get a list of users", async () => {
  //   const res = await supertest(app).get("/api/users");
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.length).toEqual(1);
  // });

  // test("delete users", async () => {
  //   const res = await supertest(app).delete("/api/users");
  //   expect(res.statusCode).toEqual(204);
  // });

  afterAll(async () => {
    await User.deleteMany({});
    await db.disconnect();
  });
});

// logoutUser ==================================================


// getCurrentUser ==================================================


// setUserSubscription ==================================================


// setUserAvatar ==================================================
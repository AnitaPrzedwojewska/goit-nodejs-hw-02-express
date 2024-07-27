require('dotenv').config();
const { DB_HOST: URI_DB } = process.env;

const {
  describe,
  beforeAll,
  afterAll,
  test,
  expect
} = require("@jest/globals");
const supertest = require('supertest');

const db = require('../../src/db/db');
// const User = require("../../src/models/users-schema");

const app = require('../../src/app');

let token;

describe("Users controller", () => {
  beforeAll(async () => {
    await db.connect(URI_DB);
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
    expect(res.body.message).toEqual("User registered");
    expect(res.body.user.email).toEqual("user2@wp.pl");
    expect(res.body.user.avatarURL).toBeDefined();
    expect(res.body.user.subscription).toBeDefined();
    expect(res.body.user.verificationToken).toBeDefined();
    expect(res.body.user.verify).toEqual(false);
    token = res.body.user.verificationToken;
  });

  // VERIFY user
  test("verify user", async () => {
    const res = await supertest(app)
      .get(`/api/users/verify/${token}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual("Verification successful");
    // expect(res.body.user.verificationToken).toEqual(" ");
    // expect(res.body.user.verify).toEqual(true);
  });

  // loginUser ==================================================
  test("login user", async () => {
    const res = await supertest(app)
      .post("/api/users/login")
      .send({ email: "user2@wp.pl", password: "password2" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.status).toEqual(200);
    expect(res.body.user.email).toEqual("user2@wp.pl");
  });

  afterAll(async () => {
    // await User.deleteMany({});
    await db.disconnect();
  });
});

// logoutUser ==================================================


// getCurrentUser ==================================================


// setUserSubscription ==================================================


// setUserAvatar ==================================================
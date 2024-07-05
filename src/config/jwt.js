const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

// const { getUser } = require('../services/users-services');

require("dotenv").config();
const SECRET = process.env.SECRET;
const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const User = require("../models/users-schema");

const setJWTStrategy = () => {
  passport.use(
    new Strategy(params, function (payload, done) {
      User.find({ _id: payload.id })
        .then(([user]) => {
          if (!user) {
            return done(new Error("User not found"));
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    })
  );
};

module.exports = setJWTStrategy;

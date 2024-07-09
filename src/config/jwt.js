const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const { getUser } = require('../services/users-services');

require("dotenv").config();
const SECRET = process.env.SECRET;
const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

const setJWTStrategy = () => {
  passport.use(
    new Strategy(params, async (payload, done) => {
      try {
        const user = await getUser({ _id: payload.id });
        if (!user) {
          return done(new Error("User not found"));
        }
        if (!user.token) {
          return done(new Error("Unauthorized"));
        }
        return done(null, user);
      } catch (error) {
        done(error)
      }
    })
  );
};

module.exports = setJWTStrategy;

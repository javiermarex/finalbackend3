import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// *** NO USAR GOOGLE POR AHORA
// import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { usersManager } from "../dao/managers/mongo.manager.js";
import { compareHash, createHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

// REGISTER
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const existingUser = await usersManager.readOne({ email });
        if (existingUser) {
          return done(null, null, { message: "Email ya esta en uso", statusCode: 401 });
        }
        req.body.password = createHash(password);
        const user = await usersManager.createOne(req.body);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// LOGIN
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readOne({ email });
        if (!user) {
          return done(null, null, { message: "Credenciales invalidas", statusCode: 401 });
        }
        const verifyPassword = compareHash(password, user.password);
        if (!verifyPassword) {
          return done(null, null, { message: "Credenciales invalidas", statusCode: 401 });
        }
        const token = createToken({
          email: user.email,
          role: user.role,
          user_id: user._id,
        });
        req.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// *** COMENTAR GOOGLE POR AHORA ***

// JWT AUTH (token en Bearer)
passport.use(
  "jwt-auth",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// JWT ADMIN (token en Cookie)
passport.use(
  "jwt-adm",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_KEY,
    },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        const user = await usersManager.readById(user_id);
        if (!user || user.role !== "ADMIN") {
          return done(null);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;

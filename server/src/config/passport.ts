import fs from "fs";
import path from "path";
import passport from "passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
// import User from "../models/user";

import userService from "../services/userService";

const rootDir = process.cwd();
const pathToKey = path.join(rootDir, "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new Strategy(options, (payload, done) => {
  userService
    .getUserById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});

passport.use(strategy);

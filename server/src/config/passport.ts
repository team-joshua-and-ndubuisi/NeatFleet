import fs from 'fs';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import path from 'path';

import prisma from './prisma';
const User = prisma.user;

const rootDir = process.cwd();
const pathToKey = path.join(rootDir, 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new Strategy(options, (payload, done) => {
  User.findUnique({ where: { id: payload.sub } })
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err, null));
});

passport.use(strategy);

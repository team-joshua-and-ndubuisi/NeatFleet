import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
// import compression from "compression";
import helmet from 'helmet';
import { limiter } from './config/limiter';
import router from './routes/index';
import { errorHandler } from './middleware/errorMiddleware';
import passport from 'passport';
import('./config/passport');

const app = express();
app.options('*', cors(corsOptions));
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(limiter);
// app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api', router);
app.use(errorHandler);

export { app };

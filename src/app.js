import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import env from '../configs/';
import passportSession from '../configs/passport';
import KeywordController from './controllers/KeywordController';
import PostController from './controllers/PostController';
import PostViewController from './controllers/PostViewController';
import TagController from './controllers/TagController';
import UserController from './controllers/UserController';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.Cookie_SECRET));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
  session({
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
passportSession(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', UserController);
app.use('/posts', PostController);
app.use('/postview', PostViewController);
app.use('/tag', TagController);
app.use('/keyword', KeywordController);

app.listen(env.PORT, () => {
  console.log('서버시작');
});

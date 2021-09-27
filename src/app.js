import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import env from '../configs/';
import passportSession from '../configs/passport';
import KeywordController from './controllers/KeywordController';
import PostController from './controllers/PostController';
import PostViewController from './controllers/PostViewController';
import TagController from './controllers/TagController';
import TagKeywordController from './controllers/TagKeywordViewController';
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
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);
passportSession(passport);

app.use(passport.initialize());
app.use(passport.session());
console.log(__dirname);
app.use('/static', express.static(path.join(__dirname, '../images')));
app.use('/users', UserController);
app.use('/posts', PostController);
app.use('/postview', PostViewController);
app.use('/tag', TagController);
app.use('/keyword', KeywordController);
app.use('/tag-keyword-view', TagKeywordController);

app.listen(env.PORT, () => {
  console.log('서버시작');
});

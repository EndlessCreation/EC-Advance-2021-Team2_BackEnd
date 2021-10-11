import passport from 'passport';
import { createOAuthUser } from '../repositories/UserRepository';
export const oauthSignUp = async (req, res, next) => {
  try {
    const user = await createOAuthUser(req.body);
    if (!user) {
      res.send('이미 존재하는 유저입니다.');
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getKeyFromGoogle = async (req, res, next) => {
  try {
    passport.authenticate('google', {
      //
      scope: ['email'],
    })(req, res, next);
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getKeyFromKakao = async (req, res, next) => {
  try {
    passport.authenticate('kakao')(req, res, next);
  } catch (err) {
    console.error(err);
    next();
  }
};
//웹앱에 로그인이 안되어있는 상태에서 구글로그인을 했을때
//1. 구글 아이디 연동이 안되어있으면 로그인페이지로 이동
//2. 구글 아이디 연동이 되어있으면 홈페이지로.
export const googleLogin = async (req, res, next) => {
  try {
    passport.authenticate(
      'google',
      {
        scope: ['email'],
      },
      async (err, user) => {
        if (user === false) return res.status(400).send('잘못된 접근입니다.');
        req.login(user, err => {
          if (err) {
            //passport login 실행단계
            console.error(err);
            next(err);
          }
          if (user.isSignUp === false) return res.send(user);
          return res.status(200).send({ isSignUp: true, email: user.email, user_id: user.id });
        });
      }
    )(req, res, next);
  } catch (err) {
    console.error(err);
    next();
  }
};

export const kakaoLogin = async (req, res, next) => {
  try {
    passport.authenticate('kakao', async (err, user) => {
      if (user === false) return res.status(400).send('잘못된 접근입니다.');
      console.log(user);
      req.login(user, err => {
        if (err) {
          //passport login 실행단계
          console.error(err);
          next(err);
        }
        if (user.isSignUp === false) return res.send(user);
        return res.status(200).send({ isSignUp: true, email: user.email, user_id: user.id });
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    next();
  }
};

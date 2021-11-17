import GoogleStrategy from 'passport-google-oauth20';
import KakaoStrategy from 'passport-kakao';
import * as UserRepository from '../../repositories/UserRepository';
import env from '../index';

export const kakaoOAuth = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: env.kakao.CLIENTID,
        clientSecret: env.kakao.CLIENTPASSWD, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL: '/users/kakao/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await UserRepository.findUserByEmail(profile._json.kakao_account.email);
        //만약 google Id 찾아봤는데 없으면 회원가입 또는 아이디 연결로 넘겨야됨.
        if (!currentUser) {
          //false면 unauthorized라고 뜬다.
          return done(
            false,
            { isSignUp: false, email: profile._json.kakao_account.email, provider: profile.provider },
            { message: '연동된 Kakao 아이디가 아닙니다.' }
          );
        }
        if (currentUser.oauth === 'kakao') return done(null, currentUser);
        return done(false, false, { message: '잘못된 접근입니다.' });
      }
    )
  );
};

export const googleOAuth = passport => {
  passport.use(
    new GoogleStrategy(
      {
        //options for the google strategy. authenticate user with google
        callbackURL: '/users/google/redirect',
        clientID: `${env.google.CLIENTID}`,
        clientSecret: `${env.google.CLIENTPASSWD}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const currentUser = await UserRepository.findUserByEmail(profile._json.email);
        //만약 google Id 찾아봤는데 없으면 회원가입 또는 아이디 연결로 넘겨야됨.
        if (!currentUser) {
          //false면 unauthorized라고 뜬다.
          return done(
            false,
            { isSignUp: false, email: profile._json.email, provider: profile.provider },
            { message: '연동된 google 아이디가 아닙니다.' }
          );
        }
        if (currentUser.oauth === 'google') return done(null, currentUser);
        return done(false, false, { message: '잘못된 접근입니다.' });
      }
    )
  );
};

import bcrypt from 'bcrypt';
import strategy from 'passport-local';
import * as UserRepository from '../../repositories/UserRepository';
const LocalStrategy = strategy.Strategy;

export default passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'account', passwordField: 'password' }, async (account, password, done) => {
      try {
        const user = await UserRepository.findUserByAccount(account);
        if (!user || user.oauth === 'kakao' || user.ouath === 'google') return done(null, false, { message: '아이디가 존재하지 않습니다.' });
        else {
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, { message: '아이디 또는 패스워드가 틀렸습니다.' });
          } else {
            return done(null, user);
          }
        }
      } catch (err) {
        console.error(err);
        return done(err);
      }
    })
  );
};

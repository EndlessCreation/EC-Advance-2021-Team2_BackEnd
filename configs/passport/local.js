import bcrypt from 'bcrypt';
import strategy from 'passport-local';
import * as UserRepository from '../../src/repositories/UserRepository';
const LocalStrategy = strategy.Strategy;

export default passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      try {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) return done(null, false, { message: '이메일이 존재하지 않습니다.' });
        else {
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, { message: '이메일 또는 패스워드가 틀렸습니다.' });
          } else {
            console.log('hi');
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

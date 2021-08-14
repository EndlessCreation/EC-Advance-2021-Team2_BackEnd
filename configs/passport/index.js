import { findUserById } from '../../src/repositories/UserRepository';
import local from './local';

//처음 로그인할때 호출된다.
//session에 id와 isAdmin을 저장한다.
export default passport => {
  passport.serializeUser((user, done) => {
    done(null, { id: user.id, isAdmin: user.isAdmin });
  });

  //이후 deserializeUser를 통해서 session과 정보를 확인하면서 authentication진행.
  passport.deserializeUser(async (info, done) => {
    const user = await findUserById(info.id);
    try {
      console.log(info);
      if (user) {
        done(null, user);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  local(passport);
};

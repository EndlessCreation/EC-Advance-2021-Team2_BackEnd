import bcrypt from 'bcrypt';
import passport from 'passport';
import * as UserRepository from '../repositories/UserRepository';

//회원가입 서비스로직.
/*
필요한 input
1. email
2. password
3. phone_number(-빼고 번호만)
4. nickname
5. birth(생년월일)
*/

//아직 중복검사 기능 넣지 않음.
//email, nickname 중복검사 따로따로 검증할지 한번에 검증할지?
export const SignUp = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      req.body.password = await bcrypt.hash(req.body.password, 12);
      req.body.phone_number = parseInt(req.body.phone_number);
      req.body.birth = parseInt(req.body.birth);
      const response = await UserRepository.createUser(req.body);
      res.status(200).send(response.email);
      //res.status(200).send(response);
    }
  } catch (err) {
    console.error(err);
    next('회원가입 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
  }
};

//가입시에 이메일 확인
//필요한 정보: {email: ~~}
export const checkEmail = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByEmail(req.body.email);
      if (user) res.send('이미 가입된 이메일입니다.');
      else {
        res.status(200).send(req.body.email);
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//가입시에 닉네임 확인
//필요한 정보: {nickname: ~~}
export const checkNickName = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByNickname(req.body.nickname);
      if (user) res.send('존재하는 닉네임입니다.');
      else {
        res.status(200).send(req.body.email);
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).send(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        console.error(err);
        return next('로그인 도중 에러가 발생하였습니다.');
      }
      return res.status(200).send(user);
    });
  })(req, res, next);
};

export const Logout = (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return next('로그아웃 도중 에러가 발생하였습니다.');
    } else {
      return res.clearCookie('connect.sid').status(200).send(req.session);
    }
  });
};

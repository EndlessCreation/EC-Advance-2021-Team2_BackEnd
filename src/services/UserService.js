import bcrypt from 'bcrypt';
import passport from 'passport';
import * as UserRepository from '../repositories/UserRepository';

/*
회원가입 서비스로직.
*/
/*
필요한 input
1. email -> 중복검사 String
2. password String
3. phone_number(-빼고 번호만). String -> 중복검사
4. nickname -> 중복검사 String
5. birth(생년월일) int
6. name(본인이름) String
*/

//아직 중복검사 기능 넣지 않음.
//email, nickname 중복검사 따로따로 검증할지 한번에 검증할지?
export const SignUp = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      req.body.password = await bcrypt.hash(req.body.password, 12);
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
//input: {email: ~~}
//이미 존재할경우 false
//존재하지 않을경우 email 반환
export const checkEmail = async (req, res, next) => {
  try {
    if (!req.params) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByEmail(req.body.email);
      if (user) res.send(false);
      else {
        res.status(200).send(req.body.email);
      }
    }
  } catch (err) {
    console.error(err);
    next('이메일 중복검사 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
  }
};

//가입시에 닉네임 확인
//input: {nickname: ~~}
//return
//이미 존재할경우 false
//존재하지 않을경우 nickname 반환
export const checkNickName = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByNickname(req.body.nickname);
      if (user) res.send(false);
      else {
        res.status(200).send(req.body.nickname);
      }
    }
  } catch (err) {
    console.error(err);
    next('닉네임 중복검사 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
  }
};
//가입시에 번호 확인
//input: {phone_number: ~~}, 이때 번호는 -없이.
//이미 존재할경우 false
//존재하지 않을경우 phone_number 반환
// export const checkUserPhoneNum = async (req, res, next) => {
//   try {
//     if (!req.body) res.status(400).send('Error.');
//     else {
//       console.log(req.body);
//       const user = await UserRepository.findUserByPhone(req.body.phone_number);
//       if (user) res.send(false);
//       else {
//         res.status(200).send(req.body.phone_number);
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     next('가입여부 확인 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
//   }
// };
export const checkUserAccount = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error');
    else {
      const user = await UserRepository.findUserByAccount(req.body.account);
      if (user) res.send(false);
      else {
        res.status(200).send(req.body.account);
      }
    }
  } catch (err) {
    console.error(err);
    next('중복된 아이디입니다. 다른 아이디를 이용해주세요');
  }
};

/*
이메일, 패스워드찾기 서비스로직.
*/
//이메일 찾기
//input: {phone_number, name,}
//성공시 email 반환
export const findUserAccount = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByEmail(req.body.email);
      if (!user || user.name !== req.body.name) res.send(false);
      else {
        res.status(200).send(user.account);
      }
    }
  } catch (err) {
    console.error(err);
    next('아이디 찾기 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
  }
};
//패스워드 찾기
//input: {name,account,email}
export const findUserPassword = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserByAccount(req.body.account);
      if (!user || user.email !== req.body.email || user.phone_number !== req.body.phone_number) res.send(false);
      else {
        //id 받고 이거 토대로 패스워드 변경시 이전값과 동일한지 체크
        next();
      }
    }
  } catch (err) {
    console.error(err);
    next('비밀번호 찾기 도중 에러가 발생하였습니다. 잠시후 다시 시도해주세요.');
  }
};

//비밀번호 변경.
export const changeUserPassword = async (req, res, next) => {
  try {
    if (!req.body) res.status(400).send('Error.');
    else {
      const user = await UserRepository.findUserById(req.body.id);
      //유저가 입력한 비밀번호가 현재 비밀번호와 일치하는지
      const result = await bcrypt.compare(req.body.existing_password, user.password);
      if (!result) {
        res.send('현재 비밀번호가 일치하지 않습니다.');
      }
      //비밀번호를 이전과 동일하게 설정한 경우.
      const isSame = await bcrypt.compare(req.body.new_password, user.password);
      if (isSame) {
        res.send('비밀번호는 이전과 다르게 해주세요.');
      } else if (req.body.check_password !== req.body.new_password) {
        //바꿀 비밀번호가 다르게 적힌경우
        res.send('변경할 비밀번호가 일치하지 않습니다. 다시 확인해주세요');
      } else {
        req.body.new_password = await bcrypt.hash(req.body.new_password, 12);
        await UserRepository.changeUserPassword(req.body.id, req.body.new_password);
        res.status(200).send(true);
      }
    }
  } catch (err) {
    console.error(err);
    next('비밀번호 찾기 도중 에러가 발생하였습니다.');
  }
};

/*
프론트 유저 확인 로직
*/
export const getUserInfo = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const profile = await UserRepository.findUserById_getInfo(user.id);
    if (!profile) {
      res.status(401).send('유저정보가 일치하지않습니다.');
    } else {
      res.status(200).send(profile);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/*
로그인, 로그아웃 서비스로직
*/
export const Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        console.error(err);
        return next('로그인 도중 에러가 발생하였습니다.');
      }
      return res.status(200).send({ id: user.id, isAdmin: user.isAdmin });
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

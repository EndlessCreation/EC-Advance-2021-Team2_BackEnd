import { findUserByAccount } from '../src/repositories/UserRepository';

export const isLoggined = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send('잘못된 접근입니다.');
  }
};

export const isNotLoggined = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send('로그인한 유저는 접근할 수 없습니다.');
  }
};

export const isAdministrator = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isAdmin === 1) {
    next();
  } else {
    res.status(400).send('관리자가 아니면 접근할 수 없습니다.');
  }
};

export const checkUserWhenGet = async (req, res, next) => {
  try {
    const sessionUser = req.session.passport.user.id;
    if (req.params.user_id !== undefined && parseInt(req.params.user_id) === sessionUser) return next();
    else if (req.params.account !== undefined) {
      const user = await findUserByAccount(req.params.account);
      if (user.id === sessionUser) {
        console.log('hi');
        return next();
      }
    }
    return res.status(400).send('잘못된 요청입니다.');
  } catch (err) {
    console.error(err);
  }
};

import { getTagById } from '../repositories/TagRepository';
import { findUserByAccount } from '../repositories/UserRepository';
export const isLoggined = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('잘못된 접근입니다.');
  }
};

export const isNotLoggined = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인한 유저는 접근할 수 없습니다.');
  }
};

export const isAdministrator = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isAdmin === 1) {
    next();
  } else {
    res.status(401).send('관리자가 아니면 접근할 수 없습니다.');
  }
};

//유저의 게시글을 보고자 할때 id값으로 Authorization
export const checkUserById = async (req, res, next) => {
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
    return res.status(401).send('잘못된 요청입니다.');
  } catch (err) {
    console.error(err);
  }
};

//태그 수정, 삭제시 유저 authorization.
export const checkUserWithTagId = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const isExist = await getTagById(req.body.tag_id);
    if (!isExist || isExist.author_id !== user.id) {
      return res.status(401).send('승인되지 않은 유저입니다..');
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

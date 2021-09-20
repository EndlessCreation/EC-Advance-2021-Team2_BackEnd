import * as KeywordRepository from '../repositories/KeywordRepository';

export const createKeyword = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const newTag = await KeywordRepository.createKeyword(req.body, user.id);
    if (!newTag) {
      res.status(400).send('중복된 keyword입니다.');
    } else {
      res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editKeyword = async (req, res, next) => {
  try {
    const newTag = await KeywordRepository.updateKeyword(req.body);
    if (!newTag) {
      return res.status(400).send('키워드 수정 도중 문제가 발생하였습니다.');
    } else {
      return res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//만약에 키워드만 지웠으면 어떻게해야되지?
//1. default로 keyword가 없는 case의 tag를 만들어놓고 keyword를 삭제하면 다 분류되지 않음으로.

export const deleteKeyword = async (req, res, next) => {
  try {
    const isDeleted = await KeywordRepository.deleteKeyword(req.body.keyword_id);
    if (!isDeleted) {
      return res.status(400).send('잘못된 요청입니다(delete).');
    } else {
      return res.status(200).send(isDeleted.keyword_name + ' 가 삭제되었습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getUSerKeyword = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const isExist = await KeywordRepository.getUserTagKeyword(user.id);
    console.log(isExist);
    if (!isExist) {
      return res.status(400).send('잘못된 요청입니다.');
    } else return res.status(200).send(isExist);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

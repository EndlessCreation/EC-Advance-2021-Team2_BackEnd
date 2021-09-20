import * as TagKeywordViewRepository from '../repositories/TagKeywordViewRepository';

export const getUserTag = async (req, res, next) => {
    try {
      const tag = TagKeywordViewRepository.getUserTag(parseInt(req.params.user_id));
      if (!tag) {
        return res.send('아직 tag가 존재하지 않습니다.');
      } else {
        return res.status(200).send(tag);
      }
    } catch (err) {
      console.error(err);
      next();
    }
  };

export const getTagByIdwithKeyword = async (req, res, next) => {
  try {
    const tag = TagKeywordViewRepository.getTagByIdwithKeyword(parseInt(req.params.tag_id));
    if (!tag) {
      return res.send('아직 tag가 존재하지 않습니다.');
    } else {
      return res.status(200).send(tag);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getKeywordInTag = async (req, res, next) => {
  try {
    const keyword = TagKeywordViewRepository.getKeywordInTag(parseInt(req.params.keyword_id));
    if (!keyword) {
      return res.send('아직 keyword가 존재하지 않습니다.');
    } else {
      return res.status(200).send(keyword);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getTagByIdwithKeywordAndPost = async (req, res, next) => {
  try {
    const tag = TagKeywordViewRepository.getTagByIdwithKeywordAndPost(parseInt(req.params.tag_id));
    if (!tag) {
      return res.send('아직 tag가 존재하지 않습니다.');
    } else {
      return res.status(200).send(tag);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getKeywordInTagsWithPost = async (req, res, next) => {
  try {
    const keyword = TagKeywordViewRepository.getKeywordInTagsWithPost(parseInt(req.params.keyword_id));
    if (!keyword) {
      return res.send('아직 keyword가 존재하지 않습니다.');
    } else {
      return res.status(200).send(keyword);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getUserTag = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const newTag = await TagKeywordViewRepository.getUserTag(user.id);
    if (!newTag) {
      res.status(400).send('아직 태그를 만들지 않으셨군요!');
    } else {
      res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

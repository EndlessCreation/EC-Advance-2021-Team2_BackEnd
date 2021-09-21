import * as TagKeywordViewRepository from '../repositories/TagKeywordViewRepository';

export const getUserTag = async (req, res, next) => {
  try {
    console.log(req.params.user_id);
    const tag = await TagKeywordViewRepository.getUserTag(parseInt(req.params.user_id));
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
    const tag = await TagKeywordViewRepository.getTagByIdwithKeyword(parseInt(req.params.tag_id));
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
    const keyword = await TagKeywordViewRepository.getKeywordInTag(parseInt(req.params.keyword_id));
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
    console.log(req.params.tag_id);
    const tag = await TagKeywordViewRepository.getTagByIdwithKeywordAndPost(parseInt(req.params.tag_id));
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

export const getKeywordInTagWithPost = async (req, res, next) => {
  try {
    const keyword = await TagKeywordViewRepository.getKeywordInTagWithPost(parseInt(req.params.keyword_id));
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

export const getPostWithTagInPeriod = async (req, res, next) => {
  try {
    const post = await TagKeywordViewRepository.getPostWithTagInPeriod(req.body);
    if (!post) {
      return res.send('아직 keyword가 존재하지 않습니다.');
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getPostWithKeywordInPeriod = async (req, res, next) => {
  try {
    const post = await TagKeywordViewRepository.getPostWithKeywordInPeriod(req.body);
    if (!post) {
      return res.send('아직 keyword가 존재하지 않습니다.');
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

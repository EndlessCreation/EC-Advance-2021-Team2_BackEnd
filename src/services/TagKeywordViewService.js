import * as KeywordRepository from '../repositories/KeywordRepository';
import * as TagKeywordViewRepository from '../repositories/TagKeywordViewRepository';
import * as TagRepository from '../repositories/TagRepository';
import * as PostViewUtil from '../utils/PostViewUtil';
export const getUserTag = async (req, res, next) => {
  try {
    const tag = await TagKeywordViewRepository.getUserTag(req.session.passport.user.id);
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
      if (tag.author_id !== req.session.passport.user.id) return res.status(401).send('잘못된 요청입니다.');
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
      if (await PostViewUtil.checkUserHasKeyword(keyword.parent_tag_id, req.session.passport.user.id)) return res.status(200).send(keyword);
      return res.status(401).send('잘못된 요청입니다.');
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getTagByIdwithKeywordAndPost = async (req, res, next) => {
  try {
    const tag = await TagKeywordViewRepository.getTagByIdwithKeywordAndPost(parseInt(req.params.tag_id));
    if (!tag) {
      return res.send('아직 tag가 존재하지 않습니다.');
    } else {
      if (tag.author_id !== req.session.passport.user.id) return res.status(401).send('잘못된 요청입니다.');
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
      if (await PostViewUtil.checkUserHasKeyword(keyword.parent_tag_id, req.session.passport.user.id)) return res.status(200).send(keyword);
      return res.status(401).send('잘못된 요청입니다.');
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
      const tag = await TagRepository.getTagById(req.body.tag_id);
      if (tag.author_id !== req.session.passport.user.id) return res.status(401).send('잘못된 요청입니다.');
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
      const keyword = await KeywordRepository.getKeywordById(req.body.keyword_id);
      if (await PostViewUtil.checkUserHasKeyword(keyword.parent_tag_id, req.session.passport.user.id)) return res.status(200).send(post);
      return res.status(401).send('잘못된 요청입니다.');
    }
  } catch (err) {
    console.error(err);
    next();
  }
};

export const getUserTagWithKeyword = async (req, res, next) => {
  try {
    const tag = await TagKeywordViewRepository.getUserTagWithKeyword(req.session.passport.user.id);
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

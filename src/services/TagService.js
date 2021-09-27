import * as TagRepository from '../repositories/TagRepository';

export const createTag = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const newTag = await TagRepository.createTag(req.body, user.id);
    if (!newTag) {
      res.status(400).send('중복된 tag입니다.');
    } else {
      res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const editTag = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const newTag = await TagRepository.updateTag(req.body, user.id);
    if (!newTag) {
      res.status(400).send('중복된 tag입니다.');
    } else {
      res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const newTag = await TagRepository.deleteTag(req.body.tag_id);
    if (!newTag) {
      res.status(400).send('중복된 tag입니다.');
    } else {
      res.status(200).send(newTag);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const createTagIfNotExist = async (req, res, next) => {
  try {
    //tag를 입력하지 않은 경우.
    if (req.body.tag === '') return next();
    const user = req.session.passport.user;
    const tag = await TagRepository.getTagByAuthorAndName(req.body, user.id);
    console.log(tag);
    if (!tag) {
      const newTag = await TagRepository.createTag(req.body, user.id);
      req.body.tag_id = newTag.id;
      next();
    } else {
      req.body.tag_id = tag.id;
      next();
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

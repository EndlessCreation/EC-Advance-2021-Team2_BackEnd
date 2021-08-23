import * as PostViewService from '../repositories/PostViewRepository';

export const getUserPost = async (req, res, next) => {
  try {
    const userPost = await PostViewService.getUserPost(req.body.user_id);
    if (!userPost) {
      res.send('아직 게시글이 존재하지 않습니다.');
    } else {
      res.status(200).send(userPost);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const allPost = await PostViewService.getAllPost();
    if (!allPost) {
      res.send('아직 게시글이 존재하지 않습니다.');
    } else {
      res.status(200).send(allPost);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

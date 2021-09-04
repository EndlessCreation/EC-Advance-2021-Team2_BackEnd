import * as PostViewRepository from '../repositories/PostViewRepository';

//한개의 게시물 불러오기
export const getPost = async (req, res, next) => {
  try {
    const post = await PostViewRepository.getPost(parseInt(req.params.post_id));
    if (!post) {
      res.send('게시글을 불러오던 도중 오류가 발생하였습니다.');
    } else {
      res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
//유저의 게시물 불러오기
export const getUserPost = async (req, res, next) => {
  try {
    const userPost = await PostViewRepository.getUserPost(req.params.account);
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
//모든 게시물 보기
export const getAllPost = async (req, res, next) => {
  try {
    const allPost = await PostViewRepository.getAllPost();
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

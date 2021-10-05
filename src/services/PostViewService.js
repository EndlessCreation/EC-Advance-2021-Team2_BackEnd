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
    const userPost = await PostViewRepository.getUserPost(req.session.passport.user.id);
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
    console.log(req.session);
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

//가장 최근 게시물 5개
export const getRecentPost = async (req, res, next) => {
  try {
    const recentPost = await PostViewRepository.getRecentPost(req.session.passport.user.id);
    if (!recentPost) {
      return res.send('아직 게시글이 존재하지 않습니다.');
    } else {
      return res.status(200).send(recentPost);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getPostInPeriod = async (req, res, next) => {
  try {
    const postInPeriod = await PostViewRepository.getPostInPeriod(req.body, req.session.passport.user.id);
    if (!postInPeriod) {
      return res.send('기간 내에 작성된 게시글이 존재하지 않습니다.');
    } else {
      return res.status(200).send(postInPeriod);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const getFavoritePost = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const favoritePost = await PostViewRepository.getFavoritePost(user);
    if (!favoritePost) {
      return res.send('즐겨찾기된 포스트가 존재하지 않습니다.');
    } else {
      return res.status(200).send(favoritePost);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

import * as PostViewRepository from '../repositories/PostViewRepository';

export const getBannerPost = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const favoritePost = await PostViewRepository.getFavoritePostRandomly(user.id);
    if (!favoritePost[0]) {
      const randomPost = await PostViewRepository.getRandomPost(user.id);
      const post = await PostViewRepository.getPost(randomPost[0].id);
      return res.status(200).send(post);
      //여기 수정 필요
    } else {
      const post = await PostViewRepository.getPost(favoritePost[0].id);
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

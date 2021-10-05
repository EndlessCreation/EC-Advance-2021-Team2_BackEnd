import * as PostViewRepository from '../repositories/PostViewRepository';

export const getBannerPost = async (req, res, next) => {
  try {
    const user = req.session.passport.user;

    const favoritePost = await PostViewRepository.getFavoritePost(user.id);
    const randomNumber = Math.round(Math.random() * favoritePost.length);
    if (!favoritePost) {
      const randomPost = await PostViewRepository.getRandomPost(user.id);
      return res.status(200).send(randomPost);
      //여기 수정 필요
    } else {
      return res.status(200).send(favoritePost[randomNumber]);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

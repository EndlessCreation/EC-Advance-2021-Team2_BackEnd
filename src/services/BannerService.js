import * as PostViewRepository from '../repositories/PostViewRepository';

export const getBannerPost = async (req, res, next) => {
  try {
    const user = req.session.passport.user;
    const favoritePost = await PostViewRepository.getFavoritePostRandomly(user.id);
    if (!favoritePost) {
      const randomPost = await PostViewRepository.getRandomPost(user.id);
      return res.status(200).send(randomPost);
      //여기 수정 필요
    } else {
      return res.status(200).send(favoritePost);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

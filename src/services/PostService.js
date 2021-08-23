import * as PostRepository from '../repositories/PostRepository';

export const writePost = async (req, res, next) => {
  try {
    console.log(req.session.passport);
    const post = await PostRepository.createPost(req.body, req.session.passport.user.id);
    if (!post) {
      return res.send('게시글을 올리는 도중 오류가 발생하였습니다.');
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const editPost = async (req, res, next) => {
  try {
    //여긴 나중에 req.params.postid로 바꿀것.
    const post = await PostRepository.updatePost(req.body.content, req.body.post_id);
    if (!post) {
      return res.send('게시글을 수정하는 도중 오류가 발생하였습니다.');
    } else {
      return res.status(200).send(post);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await PostRepository.deletePost(req.body.post_id);
    if (!post) {
      return res.send('게시글을 삭제하던 도중 오류가 발생하였습니다.');
    } else {
      return res.status(200).send('게시글 삭제 성공');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

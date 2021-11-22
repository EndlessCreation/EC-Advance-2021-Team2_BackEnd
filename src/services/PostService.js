import algolia from '../configs/algolia';
import * as PostRepository from '../repositories/PostRepository';
import * as ImageUtil from '../utils/ImageUtil';
import { deleteImageFromServer } from '../utils/ImageUtil';
import * as PostUtil from '../utils/PostUitl';
export const writePost = async (req, res, next) => {
  try {
    //tag, keyword 설정 해줬는지 안해줬는지 체크.
    req.body.tag_id = parseInt(req.body.tag_id);
    req.body.keyword_id = parseInt(req.body.keyword_id);
    const post = await PostUtil.createPost(req.body, req.session.passport.user.id);

    const isConnected = await ImageUtil.createImageWithServerAndAlgolia(req.file, post);

    //게시글 업로드 오류발생시.
    if (!post || !isConnected) return res.status(400).send('게시글을 올리는 도중 오류가 발생하였습니다.');

    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/*
body input
image, content, post_id
*/
export const editPost = async (req, res, next) => {
  try {
    req.body.post_id = parseInt(req.body.post_id);
    req.body.tag_id = parseInt(req.body.tag_id);
    req.body.keyword_id = parseInt(req.body.keyword_id);
    const toEdit = await PostRepository.getPost(req.body.post_id);
    //없는 포스트에 요청시 오류.
    if (toEdit === null || toEdit === undefined) return res.status(400).send('이미 삭제된 게시글이거나 없는 게시글입니다.');
    //기존이미지삭제
    const isDeleted = await deleteImageFromServer(toEdit.image);
    const post = await PostUtil.updatePost(req.body, req.session.passport.user.id);
    const isUpdated = await ImageUtil.updateImageWithServerAndAlgolia(req.file, post);

    if (!post || !isUpdated || !isDeleted) return res.status(400).send('게시글 수정 도중 문제가 발생하였습니다.');

    return res.status(200).send(post);

    //여긴 나중에 req.params.postid로 바꿀것.
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await PostRepository.getPost(req.body.post_id);
    if (!post) return res.status(400).send('이미 삭제된 게시글이거나 없는 게시글입니다.');
    deleteImageFromServer(post.image);
    await PostRepository.deletePost(parseInt(req.body.post_id));
    const toDelete = await PostRepository.getPost(req.body.post_id);
    if (toDelete) {
      res.status(400).send('게시글 삭제도중 오류가 발생하였습니다.');
    } else {
      await algolia.deleteObject(`${req.body.post_id}`);
      res.status(200).send('게시글을 삭제하였습니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const updatePostAboutFavorite = async (req, res, next) => {
  try {
    const post = await PostRepository.getPost(req.body.post_id);
    req.body.isFavorite = !post.isFavorite;
    const updatedPost = await PostRepository.updatePostAboutFavorite(req.body);
    if (!updatedPost) return res.status(400).send('즐겨찾기 설정도중 문제가 발생하였습니다.');
    await algolia.partialUpdateObject({ objectID: req.body.post_id, isFavorite: req.body.isFavorite });
    return res.status(200).send(updatedPost);
  } catch (err) {
    console.error(err);
    next();
  }
};

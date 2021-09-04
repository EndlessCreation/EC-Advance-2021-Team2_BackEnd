import * as PostRepository from '../repositories/PostRepository';

export const writePost = async (req, res, next) => {
  try {
    console.log('hi' + req.file);
    //여기 업로드 두개 하다가 사진만 실패하면?
    const post = await PostRepository.createPost(req.body, req.session.passport.user.id);
    let image;
    //게시글 업로드 오류발생시.
    if (!post) {
      return res.send('게시글을 올리는 도중 오류가 발생하였습니다.');
    }

    if (!req.file) {
      //사진을 첨부하지 않았을 시.
      return res.status(200).send(post);
    } else {
      //사진 첨부시.
      image = await PostRepository.createImage(post.id, req.file.path);
    }
    //image, post 업로드 뒤에 오류 체크.
    if (!image) {
      return res.send('이미지 업로드 실패. 게시글 수정을 통해 다시 올려주세요');
    } else {
      return res.status(200).send(image);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
export const editPost = async (req, res, next) => {
  try {
    //여긴 나중에 req.params.postid로 바꿀것.
    const post = await PostRepository.updatePost(req.body);
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

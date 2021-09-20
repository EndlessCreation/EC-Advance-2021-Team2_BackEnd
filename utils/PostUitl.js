import * as PostRepository from '../src/repositories/PostRepository';
import { getKeywordInTag } from '../src/repositories/TagKeywordViewRepository';
export const updatePost = async (data, user_id) => {
  try {
    data.post_id = parseInt(data.post_id);
    console.log(isNaN(data.tag_id));
    if (isNaN(data.tag_id)) {
      data.tag_id = null;
      data.keyword_id = null;
    } else if (isNaN(data.keyword_id)) {
      data.keyword_id = null;
      data.tag_id = parseInt(data.tag_id);
    } else {
      data.keyword_id = parseInt(data.keyword_id);
      const keyword = await getKeywordInTag(data.keyword_id);
      if (keyword.parent_tag_id !== parseInt(data.tag_id)) return false;
      data.tag_id = null;
    }
    return await PostRepository.updatePost(data, user_id);
  } catch (err) {
    console.error(err);
  }
};
export const createPost = async (data, user_id) => {
  try {
    if (data.tag_id === null) {
      return await PostRepository.createPost(data, user_id);
    } else if (data.keyword_id === null) {
      data.tag_id = parseInt(data.tag_id);
      return await PostRepository.createPostWithTag(data, user_id);
    } else {
      data.keyword_id = parseInt(data.keyword_id);
      const keyword = await getKeywordInTag(data.keyword_id);
      if (keyword.parent_tag_id !== parseInt(data.tag_id)) {
        return false;
      }
      return await PostRepository.createPostWithKeyword(data, user_id);
    }
  } catch (err) {
    console.error(err);
  }
};

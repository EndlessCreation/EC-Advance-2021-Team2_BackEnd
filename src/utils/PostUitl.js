import * as PostRepository from '../repositories/PostRepository';
import { getKeywordInTag } from '../repositories/TagKeywordViewRepository';
export const updatePost = async (data, user_id) => {
  try {
    if (isNaN(data.tag_id)) {
      data.tag_id = null;
      data.keyword_id = null;
    } else if (isNaN(data.keyword_id)) {
      data.keyword_id = null;
    } else {
      const keyword = await getKeywordInTag(data.keyword_id);
      if (keyword.parent_tag_id !== data.tag_id) return false;
    }
    return await PostRepository.updatePost(data, user_id);
  } catch (err) {
    console.error(err);
  }
};
export const createPost = async (data, user_id) => {
  try {
    if (isNaN(data.tag_id)) {
      return await PostRepository.createPost(data, user_id);
    } else if (isNaN(data.keyword_id)) {
      return await PostRepository.createPostWithTag(data, user_id);
    } else {
      const keyword = await getKeywordInTag(data.keyword_id);
      if (keyword.parent_tag_id !== data.tag_id) {
        return false;
      }
      return await PostRepository.createPostWithKeyword(data, user_id);
    }
  } catch (err) {
    console.error(err);
  }
};

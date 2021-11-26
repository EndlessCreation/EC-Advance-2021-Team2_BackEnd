import algolia from '../configs/algolia';
import * as KeywordRepository from '../repositories/KeywordRepository';
import * as TagKeywordViewRepository from '../repositories/TagKeywordViewRepository';
import * as TagRepository from '../repositories/TagRepository';
import * as ImageUtil from '../utils/ImageUtil';
export const createPostWithServerAndAlgolia = async (imageFile, post) => {
  try {
    post.image = await ImageUtil.createImageIfExist(imageFile, post);
    let tag, keyword;
    if (post.tag_id !== null) {
      tag = await TagRepository.getTagById(post.tag_id);
      post.tag = { tag: tag.tag, tag_color: tag.tag_color };
      if (post.keyword_id !== null) {
        keyword = await KeywordRepository.getKeywordById(post.keyword_id);
        post.keyword = { keyword: keyword.keyword_name, keyword_color: keyword.keyword_color };
      } else {
        post.keyword = null;
      }
    } else {
      post.tag = null;
      post.keyword = null;
    }

    post.objectID = post.id;
    await algolia.saveObject(post, { autoGenerateObjectIDIfNotExist: true });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updatePostWithServerAndAlgolia = async (imageFile, post) => {
  try {
    post.image = await ImageUtil.updateImageIfExist(imageFile, post);
    let tag, keyword;
    if (post.tag_id !== null) {
      tag = await TagRepository.getTagById(post.tag_id);
      post.tag = { tag: tag.tag, tag_color: tag.tag_color };
      if (post.keyword_id !== null) {
        keyword = await KeywordRepository.getKeywordById(post.keyword_id);
        post.keyword = { keyword: keyword.keyword_name, keyword_color: keyword.keyword_color };
      } else {
        post.keyword = null;
      }
    } else {
      post.tag = null;
      post.keyword = null;
    }
    post.objectID = post.id;
    await algolia.partialUpdateObject(post);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const updateAlgoliaTag = async revisedTag => {
  try {
    const posts = await TagKeywordViewRepository.getTagByIdwithKeywordAndPost(revisedTag.id);
    if (posts.keyword !== null)
      posts.keyword.map(async element => {
        element.objectID = element.id;
        element.tag = { tag: revisedTag.tag, tag_color: revisedTag.tag_color };
        await algolia.partialUpdateObject(element);
      });
    if (posts.post !== null)
      posts.post.map(async element => {
        element.objectID = element.id;
        element.tag = { tag: revisedTag.tag, tag_color: revisedTag.tag_color };
        await algolia.partialUpdateObject(element);
      });
  } catch (err) {
    console.error(err);
  }
};
export const updateAlgoliaKeyword = async revisedKeyword => {
  try {
    const posts = await TagKeywordViewRepository.getKeywordInTagWithPost(revisedKeyword.id);
    if (posts.post !== null)
      posts.post.map(async element => {
        element.objectID = element.id;
        element.keyword = { keyword: revisedKeyword.keyword_name, keyword_color: revisedKeyword.keyword_color };
        await algolia.partialUpdateObject(element);
      });
  } catch (err) {
    console.error(err);
  }
};
export const deleteAlgoliaTag = async tag_id => {
  try {
    const posts = await TagKeywordViewRepository.getTagByIdwithKeywordAndPost(tag_id);
    if (posts.keyword !== null)
      posts.keyword.map(async element => {
        element.objectID = element.id;
        element.tag_id = null;
        element.keyword_id = null;
        element.tag = null;
        element.keyword = null;
        await algolia.partialUpdateObject(element);
      });
    if (posts.post !== null)
      posts.post.map(async element => {
        element.objectID = element.id;
        element.tag_id = null;
        element.keyword_id = null;
        element.tag = null;
        element.keyword = null;
        await algolia.partialUpdateObject(element);
      });
  } catch (err) {
    console.error(err);
  }
};

import { getTagById } from '../repositories/TagRepository';

export const checkUserHasKeyword = async (tag_id, user_id) => {
  try {
    const tag = await getTagById(tag_id);
    if (tag.author_id !== user_id) return false;
    else return true;
  } catch (err) {
    console.error(err);
  }
};

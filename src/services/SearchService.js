import algolia from '../../configs/algolia';

export const searchByContent = async (req, res, next) => {
  try {
    const searchedValue = await algolia.search(req.body.content, {
      filters: `user_id:${req.body.user_id}`,
    });
    return res.status(200).send(searchedValue.hits);
  } catch (err) {
    console.error(err);
    next();
  }
};

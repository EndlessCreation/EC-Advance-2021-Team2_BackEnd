import algolia from '../../configs/algolia';

export const searchByContent = async (req, res, next) => {
  try {
    const searchedValue = await algolia.search(req.body.content, {
      filters: `user_id:${req.body.user_id}`,
    });
    console.log(searchedValue);

    return res.status(200).send('hi');
  } catch (err) {
    console.error(err);
    next();
  }
};

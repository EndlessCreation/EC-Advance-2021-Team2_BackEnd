import algoliasearch from 'algoliasearch';
import env from '..';
const client = algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_API_KEY, env.HOST_URL + ':' + env.PORT);

const index = client.initIndex(env.ALGOLIA_INDEX_NAME);

index.setSettings({
  searchableAttributes: ['content'],
  attributesForFaceting: ['user_id', 'tag', 'keyword'],
});

export default index;

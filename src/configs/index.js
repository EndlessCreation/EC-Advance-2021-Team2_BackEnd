//이걸로 .env 관리함.
import dotenv from 'dotenv';

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
if (NODE_ENV === 'production') dotenv.config({ path: `${__dirname}/../../.env.prod` });
else if (NODE_ENV === 'development') dotenv.config({ path: `${__dirname}/../../.env.dev` });
else if (NODE_ENV === 'test') dotenv.config({ path: `${__dirname}/../../.env.test` });

const env = process.env;
export default {
  NODE_ENV: NODE_ENV,
  PORT: Number(env.PORT),
  COOKIE_SECRET: env.COOKIE_SECRET,
  DBPASSWORD: env.DBPASSWORD,
  MAILID: env.MAILID,
  MAILPASSWORD: env.MAILPASSWORD,
  google: {
    CLIENTID: env.GOOGLECLIENTID,
    CLIENTPASSWD: env.GOOGLECLIENTPASSWD,
  },
  kakao: {
    CLIENTID: env.KAKAOCLIENTID,
    CLIENTPASSWD: env.KAKAOCLIENTPASSWD,
  },
  ALGOLIA_APP_ID: env.ALGOLIA_APP_ID,
  ALGOLIA_API_KEY: env.ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME: env.ALGOLIA_INDEX_NAME,
  HOST_URL: env.HOST_URL,
};

import express from 'express';
import * as Auth from '../../middleware/auth';
import * as PostViewService from '../services/PostViewService';
import * as TagKeywordViewService from '../services/TagKeywordViewService';
const router = express.Router();

router.get('/', PostViewService.getAllPost);
router.get('/:account', Auth.isLoggined, Auth.checkUserWhenGetByAccount, PostViewService.getUserPost);
router.get('/one/:post_id', PostViewService.getPost);
router.get('/recent/:user_id', Auth.isLoggined, Auth.checkUserWhenGetByAccount, PostViewService.getRecentPost);
router.get('/tag/:tag_id', Auth.isLoggined, TagKeywordViewService.getTagByIdwithKeywordAndPost);
router.get('/keyword/:keyword_id', Auth.isLoggined, TagKeywordViewService.getKeywordInTagWithPost);
router.post('/period', Auth.isLoggined, PostViewService.getPostInPeriod);
router.post('/period/tag', Auth.isLoggined, TagKeywordViewService.getPostWithTagInPeriod);
router.post('/period/keyword', Auth.isLoggined, TagKeywordViewService.getPostWithKeywordInPeriod);
export default router;

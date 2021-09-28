import express from 'express';
import * as Auth from '../../middleware/auth';
import * as PostViewService from '../services/PostViewService';
import * as TagKeywordViewService from '../services/TagKeywordViewService';
const router = express.Router();

//임시로 모든 포스트 보려고 만듬.
router.get('/', PostViewService.getAllPost);

//여기부터
router.get('/:account', Auth.isLoggined, Auth.checkUserWhenGetByAccount, PostViewService.getUserPost);
router.get('/one/:post_id', PostViewService.getPost);
router.get('/recent/:user_id', Auth.isLoggined, Auth.checkUserWhenGetByAccount, PostViewService.getRecentPost);

//즐겨찾기 게시물 가져오기
router.get('/favorite/:user_id', Auth.isLoggined, PostViewService.getFavoritePost);

//태그 키워드 필터링
router.get('/tag/:tag_id', Auth.isLoggined, TagKeywordViewService.getTagByIdwithKeywordAndPost);
router.get('/keyword/:keyword_id', Auth.isLoggined, TagKeywordViewService.getKeywordInTagWithPost);

//기간으로 필터링 + 태그 키워드
router.post('/period', Auth.isLoggined, PostViewService.getPostInPeriod);
router.post('/period/tag', Auth.isLoggined, TagKeywordViewService.getPostWithTagInPeriod);
router.post('/period/keyword', Auth.isLoggined, TagKeywordViewService.getPostWithKeywordInPeriod);
export default router;

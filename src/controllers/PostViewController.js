import express from 'express';
import * as Auth from '../../middleware/auth';
import * as PostViewService from '../services/PostViewService';
const router = express.Router();

router.get('/', PostViewService.getAllPost);
router.get('/:account', Auth.isLoggined, Auth.checkUserWhenGet, PostViewService.getUserPost);
router.get('/one/:post_id', PostViewService.getPost);
router.get('/recent/:user_id', Auth.isLoggined, Auth.checkUserWhenGet, PostViewService.getRecentPost);
router.post('/period', Auth.isLoggined, PostViewService.getPostInPeriod);
export default router;

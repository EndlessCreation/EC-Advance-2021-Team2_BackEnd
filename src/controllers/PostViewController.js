import express from 'express';
import * as PostViewService from '../services/PostViewService';

const router = express.Router();

router.get('/', PostViewService.getAllPost);
router.get('/:account', PostViewService.getUserPost);
router.get('/one/:post_id', PostViewService.getPost);
export default router;

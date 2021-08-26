import express from 'express';
import * as PostViewService from '../services/PostViewService';

const router = express.Router();

router.get('/one', PostViewService.getPost);
router.get('/all', PostViewService.getAllPost);
router.get('/user', PostViewService.getUserPost);

export default router;

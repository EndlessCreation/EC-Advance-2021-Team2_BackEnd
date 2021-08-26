import express from 'express';
import * as PostViewService from '../services/PostViewService';

const router = express.Router();

router.get('/all', PostViewService.getAllPost);

export default router;

import express from 'express';
import * as PostService from '../services/PostService';

const router = express.Router();

router.post('/upload', PostService.writePost);
router.post('/edit', PostService.editPost);
router.post('/delete', PostService.deletePost);

export default router;

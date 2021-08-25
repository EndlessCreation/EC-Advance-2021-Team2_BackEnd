import express from 'express';
import * as Auth from '../../middleware/auth';
import upload from '../../middleware/imageUpload';
import * as PostService from '../services/PostService';
const router = express.Router();

router.post('/upload', Auth.isLoggined, PostService.writePost);
router.post('/edit', Auth.isLoggined, PostService.editPost);
router.post('/delete', Auth.isLoggined, PostService.deletePost);
router.post('/imageupload', upload.single('file'));
export default router;

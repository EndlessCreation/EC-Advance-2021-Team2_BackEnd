import express from 'express';
import * as Auth from '../../middleware/auth';
import UploadImage from '../../middleware/imageUpload';
import * as PostService from '../services/PostService';
const router = express.Router();

router.post('/upload', Auth.isLoggined, UploadImage.single('file'), PostService.writePost);
router.post('/edit', Auth.isLoggined, UploadImage.single('file'), PostService.editPost);
router.post('/delete', Auth.isLoggined, PostService.deletePost);
router.post('/favorite', Auth.isLoggined, PostService.updatePostAboutFavorite);
export default router;

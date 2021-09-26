import express from 'express';
import * as Auth from '../../middleware/auth';
import UploadImage from '../../middleware/imageUpload';
import * as PostService from '../services/PostService';
const router = express.Router();

//upload 절차
//tag, keyword 있는지 확인. 있으면 next() 없으면 생성하고 next();
//이후 image 업로드하고 post 생성.
router.post('/upload', Auth.isLoggined, UploadImage.single('file'), PostService.writePost);
router.post('/edit', Auth.isLoggined, UploadImage.single('file'), PostService.editPost);
router.post('/delete', Auth.isLoggined, PostService.deletePost);
router.post('/favorite', Auth.isLoggined, PostService.updatePostAboutFavorite);
export default router;

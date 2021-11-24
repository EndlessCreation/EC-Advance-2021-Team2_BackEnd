import express from 'express';
import * as Auth from '../middleware/auth';
import * as KeywordService from '../services/KeywordService';

const router = express.Router();

router.post('/', Auth.isLoggined, KeywordService.createKeyword);
router.post('/edit', Auth.isLoggined, Auth.checkUserWithTagId, KeywordService.editKeyword);
router.post('/edit/color', Auth.isLoggined, Auth.checkUserWithTagId, KeywordService.editKeywordColor);
router.post('/delete', Auth.isLoggined, Auth.checkUserWithTagId, KeywordService.deleteKeyword);
// router.post('/create', Auth.isLoggined, KeywordService.createKeywordIfNotExist);
//user 게시글 받아올 때 authorization 필요.
// router.get('/user', Auth.isLoggined, KeywordService.g);
export default router;

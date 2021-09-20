import express from 'express';
import * as Auth from '../../middleware/auth';
import * as TagKeywordService from '../services/TagKeywordViewService';

const router = express.Router();

router.get('/alltag/:user_id', Auth.isLoggined, TagKeywordService.getUserTag);
router.get('/tag-keyword/:user_id', Auth.isLoggined, TagKeywordService.getTagByIdwithKeyword);
router.get('/keyword/:keyword_id', Auth.isLoggined, Auth.checkUserWithTagId, TagKeywordService.getKeywordInTag);

export default router;

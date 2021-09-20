import express from 'express';
import * as Auth from '../../middleware/auth';
import * as TagKeywordService from '../services/TagKeywordViewService';

const router = express.Router();

router.get('/alltag/:user_id', Auth.isLoggined, TagKeywordService.getUserTag);
router.get('/tag/:tag_id', Auth.isLoggined, TagKeywordService.getTagByIdwithKeyword);

export default router;

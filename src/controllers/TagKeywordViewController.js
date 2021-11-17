import express from 'express';
import * as Auth from '../middleware/auth';
import * as TagKeywordViewService from '../services/TagKeywordViewService';

const router = express.Router();

router.get('/alltag', Auth.isLoggined, TagKeywordViewService.getUserTag);
router.get('/alltag/keyword', Auth.isLoggined, TagKeywordViewService.getUserTagWithKeyword);
router.get('/tag/:tag_id', Auth.isLoggined, TagKeywordViewService.getTagByIdwithKeyword);

export default router;

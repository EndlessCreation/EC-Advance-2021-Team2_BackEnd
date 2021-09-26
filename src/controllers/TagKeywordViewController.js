import express from 'express';
import * as Auth from '../../middleware/auth';
import * as TagKeywordViewService from '../services/TagKeywordViewService';

const router = express.Router();

router.get('/alltag/:user_id', Auth.isLoggined, TagKeywordViewService.getUserTag);
router.get('/tag/:tag_id', Auth.isLoggined, TagKeywordViewService.getTagByIdwithKeyword);

export default router;

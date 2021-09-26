import express from 'express';
import * as Auth from '../../middleware/auth';
import * as TagService from '../services/TagService';

const router = express.Router();

router.post('/', Auth.isLoggined, TagService.createTag);
router.post('/edit', Auth.isLoggined, Auth.checkUserWithTagId, TagService.editTag);
router.post('/delete', Auth.isLoggined, Auth.checkUserWithTagId, TagService.deleteTag);
router.post('/create', Auth.isLoggined, TagService.createTagIfNotExist);
export default router;

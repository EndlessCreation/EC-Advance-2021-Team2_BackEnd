import express from 'express';
import * as Auth from '../middleware/auth';
import * as SearchService from '../services/SearchService';
const router = express.Router();

router.post('/', Auth.isLoggined, SearchService.searchByContent);

export default router;

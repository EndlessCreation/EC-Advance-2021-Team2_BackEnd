import express from 'express';
import * as Auth from '../../middleware/auth';
import * as BannerService from '../services/BannerService';

const router = express.Router();

router.get('/', Auth.isLoggined, BannerService.getBannerPost);

export default router;

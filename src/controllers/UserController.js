import express from 'express';
import * as Auth from '../../middleware/auth';
import * as UserService from '../services/UserService';

const router = express.Router();

//회원가입 라우팅경로
router.post('/signin', Auth.isNotLoggined, UserService.SignUp);
router.post('/login', Auth.isNotLoggined, UserService.Login);
router.get('/logout', Auth.isLoggined, UserService.Logout);

export default router;

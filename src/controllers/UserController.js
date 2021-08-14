import express from 'express';
import * as UserService from '../services/UserService';

const router = express.Router();

//회원가입 라우팅경로
router.post('/signin', UserService.SignUp);
router.post('/login', UserService.Login);
router.get('/logout', UserService.Logout);

export default router;

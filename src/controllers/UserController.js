import express from 'express';
import * as Auth from '../../middleware/auth';
import * as UserService from '../services/UserService';

const router = express.Router();

//회원가입 라우팅경로
router.post('/check/email', Auth.isNotLoggined, UserService.checkEmail);
router.post('/check/nickname', Auth.isNotLoggined, UserService.checkNickName);
router.post('/check/phone', Auth.isNotLoggined, UserService.checkUserPhoneNum);
router.post('/signin', Auth.isNotLoggined, UserService.SignUp);

//로그인, 로그이웃
router.post('/login', Auth.isNotLoggined, UserService.Login);
router.get('/logout', Auth.isLoggined, UserService.Logout);

//아이디,비밀번호찾기
router.post('/find/email', Auth.isNotLoggined, UserService.findUserEmail);
router.post('/find/password', Auth.isNotLoggined, UserService.findUserPassword);
router.post('/find/changepw', Auth.isNotLoggined, UserService.changeUserPassword);
export default router;

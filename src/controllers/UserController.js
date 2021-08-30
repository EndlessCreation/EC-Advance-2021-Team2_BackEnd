import express from 'express';
import * as Auth from '../../middleware/auth';
import * as UserService from '../services/UserService';

const router = express.Router();

//회원가입 라우팅경로
router.post('/check/email', Auth.isNotLoggined, UserService.checkEmail);
router.post('/check/nickname', Auth.isNotLoggined, UserService.checkNickName);
router.post('/check/account', Auth.isNotLoggined, UserService.checkUserAccount);
router.post('/signup', Auth.isNotLoggined, UserService.SignUp);

//로그인, 로그이웃
router.post('/login', Auth.isNotLoggined, UserService.Login);
router.get('/logout', Auth.isLoggined, UserService.Logout);

//유저 정보 체크
router.post('/get_user', Auth.isLoggined, UserService.getUserInfo);

//아이디,비밀번호찾기
router.post('/find/email', Auth.isNotLoggined, UserService.findUserAccount);
router.post('/find/password', Auth.isNotLoggined, UserService.findUserPassword);
router.post('/find/changepw', Auth.isNotLoggined, UserService.changeUserPassword);
export default router;

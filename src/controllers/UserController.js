import express from 'express';
import * as Auth from '../middleware/auth';
import * as Transfer from '../middleware/findPassword';
import * as OauthService from '../services/OauthService';
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

//oauth login
router.get('/google', Auth.isNotLoggined, OauthService.getKeyFromGoogle);
router.get('/google/redirect', Auth.isNotLoggined, OauthService.googleLogin);
router.get('/kakao', Auth.isNotLoggined, OauthService.getKeyFromKakao);
router.get('/kakao/redirect', Auth.isNotLoggined, OauthService.kakaoLogin);
router.post('/oauth/signup', Auth.isNotLoggined, OauthService.oauthSignUp);
//유저 정보 체크
router.get('/get_user', Auth.isLoggined, UserService.getUserInfo);

//아이디,비밀번호찾기
router.post('/find/email', Auth.isNotLoggined, UserService.findUserAccount);
router.post('/find/password', Auth.isNotLoggined, UserService.findUserPassword, Transfer.transferPassword);
router.post('/find/changepw', Auth.isLoggined, UserService.changeUserPassword);
router.post('/check/password', Auth.isLoggined, UserService.checkPassword);
//유저 삭제
router.delete('/delete/', Auth.isLoggined, UserService.deleteUser);
export default router;

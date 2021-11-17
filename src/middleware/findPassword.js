import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';
import env from '../configs';
import * as UserRepository from '../repositories/UserRepository';
// nodemailer Transport 생성

export const transferPassword = async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserRepository.findUserByEmail(req.body.email);
    const randomPassword = randomstring.generate(7);
    const hash = await bcrypt.hash(randomPassword, 12);
    await UserRepository.changeUserPassword(user.id, hash);
    const transportConfig = {
      host: 'smtp.naver.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        // 이메일을 보낼 계정 데이터 입력
        user: env.MAILID,
        pass: env.MAILPASSWORD,
      },
    };
    const emailOptions = {
      // 옵션값 설정
      from: env.MAILID,
      to: req.body.email,
      subject: '비밀번호 초기화 이메일입니다.',
      html: '비밀번호는 다음과 같습니다. ' + randomPassword,
    };

    const transporter = await nodemailer.createTransport(transportConfig);
    transporter.sendMail(emailOptions); //전송
    res.status(200).send('전송완료');
  } catch (err) {
    console.error(err);
    res.status(400).send('비밀번호 변경도중 에러가 발생하였습니다.');
  }
};

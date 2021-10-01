import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//서비스코드에서 담아준 정보로 유저 생성.
export const createUser = async data => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

/*input
  1. email
  2. oauth
  3. nickname
  4. phone_number
*/
export const createOAuthUser = async data => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    console.error(err);
  }
};

//유저를 이메일로 찾는다.
export const findUserByEmail = async email => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findUserByNickname = async nickname => {
  try {
    return await prisma.user.findUnique({
      where: {
        nickname,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//유저를 아이디로 찾는다.
export const findUserById = async id => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findUserById_getInfo = async id => {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        account: true,
        email: true,
        name: true,
        nickname: true,
        posts: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findUserByPhone = async phone_number => {
  try {
    return await prisma.user.findUnique({
      where: {
        phone_number,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const findUserByAccount = async account => {
  try {
    return await prisma.user.findUnique({
      where: {
        account,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const changeUserPassword = async (id, password) => {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

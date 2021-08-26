import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPost = async post_id => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: post_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserPost = async user_account => {
  try {
    return await prisma.post.findMany({
      where: {
        account: user_account,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllPost = async () => {
  try {
    return await prisma.post.findMany({
      include: {
        image: true,
        hashtags: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

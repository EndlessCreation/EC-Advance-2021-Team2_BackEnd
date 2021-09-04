import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPost = async post_id => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      include: {
        author: true,
        image: true,
        hashtags: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserPost = async user_account => {
  try {
    return await prisma.user.findMany({
      where: {
        account: user_account,
      },
      include: {
        posts: {
          include: {
            image: true,
            hashtags: true,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllPost = async () => {
  try {
    console.log('hi');
    return await prisma.post.findMany({
      include: {
        author: true,
        image: true,
        hashtags: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

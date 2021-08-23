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

export const getUserPost = async user_id => {
  try {
    return await prisma.post.findMany({
      where: {
        id: user_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllPost = async () => {
  try {
    return await prisma.post.findMany();
  } catch (err) {
    console.error(err);
  }
};

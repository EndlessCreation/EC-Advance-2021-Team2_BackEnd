import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (data, user_id) => {
  try {
    return await prisma.post.create({
      data: {
        content: data.content,
        author: {
          connect: {
            id: user_id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = async data => {
  try {
    return await prisma.post.update({
      where: {
        id: data.post_id,
      },
      data: {
        content: data.content,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async post_id => {
  try {
    return await prisma.post.delete({
      where: {
        id: post_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getPost = async post_id => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      select: {
        id: true,
        image: true,
        content: true,
        createAt: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

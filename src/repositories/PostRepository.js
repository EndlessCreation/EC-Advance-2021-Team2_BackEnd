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

export const updatePost = async (content, post_id) => {
  try {
    return await prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        content: content,
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

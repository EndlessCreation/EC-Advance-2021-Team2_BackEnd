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

export const createImage = async (post_id, path) => {
  try {
    return prisma.image.create({
      data: {
        path,
        postImage: {
          connect: {
            id: post_id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//미완성. 수정필요
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

//미완성. 수정필요
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

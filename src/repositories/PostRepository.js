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

export const createPostWithTag = async (data, user_id) => {
  try {
    return await prisma.post.create({
      data: {
        content: data.content,
        author: {
          connect: {
            id: user_id,
          },
        },
        post_tag: {
          connect: {
            id: data.tag_id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPostWithKeyword = async (data, user_id) => {
  try {
    return await prisma.post.create({
      data: {
        content: data.content,
        author: {
          connect: {
            id: user_id,
          },
        },
        post_keyword: {
          connect: {
            id: data.keyword_id,
          },
        },
        post_tag: {
          connect: {
            id: data.tag_id,
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
        tag_id: data.tag_id,
        keyword_id: data.keyword_id,
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
        isFavorite: true,
        content: true,
        createAt: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePostAboutFavorite = async data => {
  try {
    return await prisma.post.update({
      where: {
        id: data.post_id,
      },
      data: {
        isFavorite: data.isFavorite,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

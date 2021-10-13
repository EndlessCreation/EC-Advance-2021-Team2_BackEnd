import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPost = async post_id => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      include: {
        image: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUserPost = async user_id => {
  try {
    return await prisma.user.findMany({
      where: {
        id: user_id,
      },
      select: {
        posts: {
          include: {
            image: true,
            post_tag: true,
            post_keyword: true,
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
    return await prisma.post.findMany({
      include: {
        author: true,
        image: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRecentPost = async user_id => {
  try {
    return await prisma.post.findMany({
      take: 5,
      where: {
        user_id,
      },
      orderBy: {
        createAt: 'desc',
      },
      include: {
        image: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getPostInPeriod = async (data, user_id) => {
  try {
    return prisma.post.findMany({
      where: {
        user_id,
        createAt: {
          lte: data.maximum_date,
          gte: data.minimum_date,
        },
      },
      include: {
        image: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getFavoritePost = async data => {
  try {
    return await prisma.post.findMany({
      where: {
        user_id: data.user_id,
        isFavorite: true,
      },
      include: {
        image: true,
        post_tag: true,
        post_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
export const getFavoritePostRandomly = async user_id => {
  try {
    return await prisma.$queryRaw(`SELECT * FROM post WHERE post.user_id=${user_id} AND post.isFavorite = true ORDER BY rand() limit 1;`);
  } catch (err) {
    console.error(err);
  }
};
export const getRandomPost = async user_id => {
  try {
    return await prisma.$queryRaw(`SELECT * from post WHERE user_id=${user_id} order by rand() limit 1;`);
  } catch (err) {
    console.error(err);
  }
};

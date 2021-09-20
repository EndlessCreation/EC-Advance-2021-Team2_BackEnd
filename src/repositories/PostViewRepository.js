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
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRecentPost = async data => {
  try {
    console.log(data);
    return await prisma.post.findMany({
      take: 4,
      where: {
        user_id: data.user_id,
      },
      orderBy: {
        createAt: 'desc',
      },
      include: {
        image: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getPostInPeriod = async data => {
  try {
    return prisma.post.findMany({
      where: {
        createAt: {
          gte: data.maximum_date,
          lte: data.minimum_date,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

// export const getCurrentPost = async() => {
//   try{
//     return await
//   }catch(err){
//     console.error(err);
//   }
// }
// export const getCurrentPost = async() => {
//   try{
//     return await
//   }catch(err){
//     console.error(err);
//   }
// }

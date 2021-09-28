import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//유저의 모든 태그 반환
export const getUserTag = async user_id => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        all_tag_keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//tag안에 있는 keyword만
export const getTagByIdwithKeyword = async tag_id => {
  try {
    return await prisma.tag.findUnique({
      where: {
        id: tag_id,
      },
      include: {
        keyword: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//tag안에 있는 특정 keyword
export const getKeywordInTag = async keyword_id => {
  try {
    return await prisma.keyword.findUnique({
      where: {
        id: keyword_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//tag안에 있는 keyword 및 Post들.
export const getTagByIdwithKeywordAndPost = async tag_id => {
  try {
    return await prisma.tag.findUnique({
      where: {
        id: tag_id,
      },
      include: {
        keyword: {
          include: {
            post: {
              include: {
                image: true,
                post_tag: true,
                post_keyword: true,
              },
            },
          },
        },
        post: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

//tag안에 있는 특정 keyword와 post들.
export const getKeywordInTagWithPost = async keyword_id => {
  try {
    return await prisma.keyword.findUnique({
      where: {
        id: keyword_id,
      },
      include: {
        post: {
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

export const getPostWithTagInPeriod = async data => {
  try {
    return prisma.post.findMany({
      where: {
        createAt: {
          lte: data.maximum_date,
          gte: data.minimum_date,
        },
        tag_id: data.tag_id,
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

export const getPostWithKeywordInPeriod = async data => {
  try {
    return prisma.post.findMany({
      where: {
        createAt: {
          lte: data.maximum_date,
          gte: data.minimum_date,
        },
        keyword_id: data.keyword_id,
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

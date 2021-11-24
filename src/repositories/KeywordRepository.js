import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//input
//tag, tag_color, keyword, keyword_color, user_id
export const createKeyword = async data => {
  try {
    return await prisma.keyword.create({
      data: {
        keyword_name: data.keyword,
        keyword_color: data.keyword_color,
        parent_tag: {
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

//input
//tag, tag_color, keyword, keyword_color
export const updateKeyword = async data => {
  try {
    return await prisma.keyword.update({
      where: {
        id: data.keyword_id,
      },
      data: {
        keyword_name: data.keyword,
        keyword_color: data.keyword_color,
        parent_tag: {
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

export const deleteKeyword = async keyword_id => {
  try {
    return await prisma.keyword.delete({
      where: {
        id: keyword_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getKeywordByTagAndName = async data => {
  try {
    return await prisma.keyword.findUnique({
      where: {
        parent_tag_id_keyword_name: {
          parent_tag_id: data.tag_id,
          keyword_name: data.keyword,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getKeywordById = async keyword_id => {
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
export const updateKeywordColor = async data => {
  try {
    return await prisma.keyword.update({
      where: {
        id: data.keyword_id,
      },
      data: {
        keyword_color: data.keyword_color,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//input
//tag, tag_color, keyword, keyword_color, user_id
export const createKeyword = async (data, tag_id) => {
  try {
    return await prisma.keyword.create({
      data: {
        keyword_name: data.keyword,
        keyword_color: data.keyword_color,
        parent_tag: {
          connect: {
            id: tag_id,
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

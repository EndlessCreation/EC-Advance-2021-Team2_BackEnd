import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTag = async (data, user_id) => {
  try {
    return await prisma.tag.create({
      data: {
        tag: data.tag,
        tag_color: data.tag_color,
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
export const updateTag = async data => {
  try {
    return await prisma.tag.update({
      where: {
        id: data.tag_id,
      },
      data: {
        tag: data.tag,
        tag_color: data.tag_color,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
export const deleteTag = async tag_id => {
  try {
    return await prisma.$queryRaw(`DELETE FROM tag WHERE tag.id=${tag_id}`);
  } catch (err) {
    console.error(err);
  }
};

export const getTagById = async tag_id => {
  try {
    return await prisma.tag.findUnique({
      where: {
        id: tag_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getTagByAuthorAndName = async (data, user_id) => {
  try {
    return await prisma.tag.findUnique({
      where: {
        author_id_tag: {
          author_id: user_id,
          tag: data.tag,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateTagColor = async data => {
  try {
    return await prisma.tag.update({
      where: {
        id: data.tag_id,
      },
      data: {
        tag_color: data.tag_color,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

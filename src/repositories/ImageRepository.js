import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createImage = async (postData, path) => {
  try {
    return prisma.image.create({
      data: {
        path,
        postImage: {
          connect: {
            id: postData.id,
          },
        },
        user: {
          connect: {
            id: postData.user_id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
export const updateImage = async (image_id, data) => {
  try {
    return await prisma.image.update({
      where: {
        id: image_id,
      },
      data: {
        path: data.path,
        postImage: {
          connect: {
            id: data.post_id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
export const deleteImage = async image_id => {
  try {
    return await prisma.image.delete({
      where: {
        id: image_id,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getImageByUserId = async user_id => {
  try {
    return await prisma.image.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        path: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

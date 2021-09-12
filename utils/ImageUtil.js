import fs from 'fs';
import * as ImageRepository from '../src/repositories/ImageRepository';

export const deleteImageFromServer = async image => {
  try {
    if (image !== null && image !== undefined) fs.unlinkSync(image.path);
  } catch (err) {
    console.error(err);
  }
};

export const deleteImageFromDB = async image => {
  try {
    if (image) return await ImageRepository.deleteImage(image.id);
    else return true;
  } catch (err) {
    console.error(err);
  }
};

export const updateImageToDB = async (image, data) => {
  try {
    console.log(image);
    console.log(data);
    if (image) return await ImageRepository.updateImage(image.id, data);
    else return await ImageRepository.createImage(data.post_id, data.path);
  } catch (err) {
    console.error(err);
  }
};

import fs from 'fs';
import path from 'path';
import * as ImageRepository from '../repositories/ImageRepository';
import { createImage } from '../repositories/ImageRepository';

export const deleteImageFromServer = async image => {
  try {
    if (image !== null) fs.unlinkSync(path.join(__dirname, `../../images/${image.path}`));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteImageFromDB = async image => {
  try {
    if (image !== null) return await ImageRepository.deleteImage(image.id);
    else return true;
  } catch (err) {
    console.error(err);
  }
};

export const updateImageToDB = async (post, data) => {
  try {
    if (post.image !== undefined) return await ImageRepository.updateImage(post.image.id, data);
    return await ImageRepository.createImage(post, data.path);
  } catch (err) {
    console.error(err);
  }
};
export const createImageIfExist = async (imageFile, post) => {
  try {
    if (imageFile === undefined) {
      return null;
    } else {
      const image = await createImage(post, imageFile.filename);
      return image;
    }
  } catch (err) {
    console.error(err);
  }
};
export const updateImageIfExist = async (imageFile, post) => {
  try {
    if (imageFile === undefined) {
      return null;
    } else {
      const editedImage = await updateImageToDB(post, { path: imageFile.filename, post_id: post.id });
      return editedImage;
    }
  } catch (err) {
    console.error(err);
  }
};

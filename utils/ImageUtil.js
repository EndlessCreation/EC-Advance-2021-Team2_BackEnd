import fs from 'fs';
import path from 'path';
import algolia from '../configs/algolia';
import * as ImageRepository from '../src/repositories/ImageRepository';
import { createImage } from '../src/repositories/ImageRepository';

export const deleteImageFromServer = async image => {
  try {
    if (image !== null) fs.unlinkSync(path.join(__dirname, `../images/${image.path}`));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const deleteImageFromDB = async image => {
  try {
    if (image !== undefined) return await ImageRepository.deleteImage(image.id);
    else return true;
  } catch (err) {
    console.error(err);
  }
};

export const updateImageToDB = async (image, data) => {
  try {
    if (image !== undefined) return await ImageRepository.updateImage(image.id, data);
    return await ImageRepository.createImage(data.post_id, data.path);
  } catch (err) {
    console.error(err);
  }
};

export const createImageWithServerAndAlgolia = async (imageFile, post) => {
  try {
    if (imageFile === undefined) {
      post.image = null;
    } else {
      const image = await createImage(post.id, imageFile.filename);
      post.image = image;
    }
    post.objectID = post.id;
    await algolia.saveObject(post, { autoGenerateObjectIDIfNotExist: true });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateImageWithServerAndAlgolia = async (imageFile, post) => {
  try {
    if (imageFile === undefined) {
      await deleteImageFromDB(post.image);
      post.image = null;
    } else {
      const editedImage = await updateImageToDB(post.image, { path: imageFile.filename, post_id: post.id });
      post.image = editedImage;
    }
    post.objectID = post.id;
    await algolia.partialUpdateObject(post);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const fs = require("fs").promises;
// const path = require('path');
const Jimp = require("jimp");

const { AVATAR_SIZE } = require("../constants/constants");

const isAccessible = (path) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

const setupFolder = async (path) => {
  const folderExist = await isAccessible(path);
  if (!folderExist) {
    try {
      await fs.mkdir(path);
    } catch (error) {
      console.log("No permissions!");
      process.exit(1);
    }
  }
};

const isImageAndTransform = async (path) =>
  new Promise((resolve) => {
    Jimp.read(path, async (err, image) => {
      if (err) resolve(false);

      try {
        await image
          .rotate(360)
          .resize(AVATAR_SIZE, AVATAR_SIZE)
          .write(path);
        resolve(true);
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  });

module.exports = { setupFolder, isImageAndTransform };

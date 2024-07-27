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
  if (!(await isAccessible(path))) {
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
        const w = image.getWidth();
        const h = image.getHeight();
        const minDim = w < h ? w : h;

        const cropWidth = w > minDim ? minDim : w;
        const cropHeight = h > minDim ? minDim : h;

        const centerX = Math.round(w / 2 - cropWidth / 2);
        const centerY = Math.round(h / 2 - cropHeight / 2);

        await image
          .rotate(360)
          .crop(
            centerX < 0 ? 0 : centerX,
            centerY < 0 ? 0 : centerY,
            cropWidth,
            cropHeight
          )
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

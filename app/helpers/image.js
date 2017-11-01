const Jimp = require('jimp');
const fs = require('fs');
const isSvg = require('is-svg');
const openDialog = require('../renderers/dialog');

function detectSVG(filePath) {
  const data = fs.readFileSync(filePath);
  return isSvg(data);
}

function svg2Base64(filePath) {
  const data = fs.readFileSync(filePath);
  const base64String = 'data:image/svg+xml;base64,' + data.toString('base64');
  return base64String;
}

function processImg(filePath, callback) {
  // Handle SVG File
  if (detectSVG(filePath)) {
    const base64String = svg2Base64(filePath);
    callback(base64String);
    return;
  }

  // Normal Image File such as PNG or JPEG
  Jimp.read(filePath, (err, image) => {
    if (err) handleError(err);
    image
      .resize(125, Jimp.AUTO)
      .quality(100)
      .getBase64(Jimp.MIME_PNG, (err, result) => {
        if (err) handleError(err);
        callback(result);
      });
  });
}

function handleError(err) {
  openDialog({
    type: 'warning',
    title: err.message,
    message: 'Please select another file',
  });
}

export {
  processImg
};

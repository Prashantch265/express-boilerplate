const fs = require("fs");

const deleteFile = async (path) => {
  await fs.unlink(path, (err) => {
    if (err) console.log(err);
  });
};

module.exports = deleteFile;

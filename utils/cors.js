const { allowedOrigins, allowedExtension } = require("../config/protect");

const corsOption = (req, cb) => {
  let option;

  let isDomainAllowed = allowedOrigins.indexOf(req.header("Origin")) !== -1;
  //   let isExtensionAllowed = allowedExtension.indexOf(req.path.endsWith(`${ext}`));

  if (isDomainAllowed) {
    option = { origin: true };
  } else {
    option = { origin: false };
  }

  cb(null, option);
};

const getExtension = (req) => {};

module.exports = { corsOption };

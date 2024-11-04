const util = require("util");

const formattedMsg = (err, errorMsg) => {
  return err.source
    ? util.format(
        errorMsg[err.message],
        ...(typeof err.source === "string" ? [err.source] : err.source)
      )
    : errorMsg[err.message];
};

module.exports = formattedMsg;

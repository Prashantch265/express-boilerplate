const util = require("util");

// err.message is usually a literal, human-readable string (e.g.
// "invalid Email or Password"), but some call sites pass a message.json
// key (e.g. "duplicateData") to get %s-formatted with err.source. Only
// treat it as a key if it actually resolves to one — otherwise fall back
// to the literal message so throws like `new ConflictException("Admin
// with this email already exists")` don't crash the error handler.
const formattedMsg = (err, errorMsg) => {
  const template = errorMsg[err.message];
  if (!template) return err.message;

  return err.source
    ? util.format(
        template,
        ...(typeof err.source === "string" ? [err.source] : err.source)
      )
    : template;
};

module.exports = formattedMsg;

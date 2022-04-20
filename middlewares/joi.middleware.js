module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return res.status(422).json({
        status: "ERROR",
        code: 422,
        message: message.replace(/[^a-zA-Z ]/g, ""),
      });
    }
    req.body = value;
    next();
  };
};

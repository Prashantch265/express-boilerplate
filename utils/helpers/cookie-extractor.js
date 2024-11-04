const cookieExtractor = (req) => {
  let token;
  if (req && req.cookies) token = req.cookies["AuthToken"];
  return token;
};

module.exports = cookieExtractor;

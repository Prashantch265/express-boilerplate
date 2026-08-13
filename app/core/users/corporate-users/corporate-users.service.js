const CorporateUsersRepository = require("./corporate-users.repository");
const { NotFoundException, ServiceUnavailableException } = require("@exceptions");

const getUserByUserId = async (userId) => {
  const user = await CorporateUsersRepository.getByUserId(userId);
  if (!user) throw new NotFoundException("Corporate user not found");
  return user;
};

// Corporate users have no signup/password flow implemented yet — only the
// model exists. See express-boilerplate#8.
const validateCredentials = async () => {
  throw new ServiceUnavailableException(
    "Password login for corporate users is not implemented yet"
  );
};

module.exports = { getUserByUserId, validateCredentials };

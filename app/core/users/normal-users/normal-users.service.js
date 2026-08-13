const NormalUsersRepository = require("./normal-users.repository");
const { NotFoundException, ServiceUnavailableException } = require("@exceptions");

const getUserByUserId = async (userId) => {
  const user = await NormalUsersRepository.getByUserId(userId);
  if (!user) throw new NotFoundException("Normal user not found");
  return user;
};

// Normal users have no signup/password flow implemented yet — only the
// model exists. See express-boilerplate#8.
const validateCredentials = async () => {
  throw new ServiceUnavailableException(
    "Password login for normal users is not implemented yet"
  );
};

module.exports = { getUserByUserId, validateCredentials };

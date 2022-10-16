const bcrypt = require("bcrypt");
const User = require("../../database/models/internal-user/user.model");
const jwt = require("../../lib/jwt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let currentUser = await User.findOne({
      where: { email: email },
    });

    if (currentUser) {
      return res.status(400).json("user already existed");
    }

    let user = User.build({
      username: name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { err: "user not found" };
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.issueJwt(user);
        return res
          .status(200)
          .json({ success: true, token: token, expiresIn: jwt.expiresIn });
      } else {
        return res.status(400).json("password didn't match");
      }
    }
  } catch (err) {
    next(err);
    res.status(400).json(err);
  }
};

const findByUid = async (uid) => {
  try {
    let user = await User.findOne({
      where: { uid: uid },
    });

    return user;
  } catch (err) {
    return err;
  }
};
module.exports = { signup, signin, findByUid };

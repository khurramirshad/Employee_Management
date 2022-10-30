const User = require("../models/userModel");

const register = async (body) => {
  const user = await new User({
    username: body.username,
    email: body.email,
    hashedPassword: body.password,
  });
  await user.save();
  user.hashedPassword = undefined;
  user.salt = undefined;
  return user;
};

const list = async () => {
  const user = await User.find();
  return user;
};

const userService = {
  register,
  list,
};

module.exports = userService;

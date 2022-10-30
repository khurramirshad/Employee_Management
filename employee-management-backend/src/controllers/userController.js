const userService = require("../services/userServices");
const ErrorHandler = require("../helpers/dbErrorHandler");
const Response = require("../helpers/apiResponse");

const registerUser = async (req, res) => {
  try {
    const user = await userService.register({ ...req.body });
    Response(null, res, 200, "Account created successfully", user);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.list();
    Response(null, res, 200, "Employee's List", user);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};


const userController = {
  registerUser,
  getUser,
};

module.exports = userController;

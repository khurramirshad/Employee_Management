const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/user/register")
  .post(userController.registerUser)
  .get(userController.getUser);

module.exports = router;

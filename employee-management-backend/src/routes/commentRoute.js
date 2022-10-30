const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

router
  .route("/comments")
  .post(authController.hasAuthorization, commentController.createComment)
  .get(authController.hasAuthorization, commentController.getComment);

module.exports = router;

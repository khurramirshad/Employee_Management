const commentService = require("../services/commentServices");
const ErrorHandler = require("../helpers/dbErrorHandler");
const Response = require("../helpers/apiResponse");

const createComment = async (req, res) => {
  try {
    const comment = await commentService.create({ ...req.body });
    Response(null, res, 200, "Comment posted successfully", comment);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getComment = async (req, res) => {
  try {
    const comment = await commentService.list();
    Response(null, res, 200, "Comments posted By", comment);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const commentController = {
  createComment,
  getComment,
};

module.exports = commentController;

const Comment = require("../models/commentModel");

const create = async (body) => {
  const comment = await new Comment({
    text: body.text,
    author: body.author,
  });
  await comment.save();
  return comment;
};

const list = async () => {
  const comment = await Comment.find().populate("author");
  return comment;
};

const commentService = {
  create,
  list,
};

module.exports = commentService;

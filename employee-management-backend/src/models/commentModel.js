const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },

  { versionKey: false }
);

const Comment = mongoose.model("comment", commentsSchema);

module.exports = Comment;

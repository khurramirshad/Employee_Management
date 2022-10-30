const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: "Username is required",
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
      unique: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },

  { versionKey: false }
);

const Employee = mongoose.model("employee", empSchema);

module.exports = Employee;

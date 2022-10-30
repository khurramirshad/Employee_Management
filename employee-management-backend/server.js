// * packages imports
const express = require("express");

const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./src/config/config.env" });

// * local imports
const userRoutes = require("./src/routes/userRoute");
const authRoutes = require("./src/routes/authRoute");
const empRoutes = require("./src/routes/empRoute");
const commentRoutes = require("./src/routes/commentRoute");

// * Connecting to mongodb
mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Mongodb Connection Successful"))
  .catch((err) => console.log(`Mongodb Connection Failed ${err}`));

const app = express();
const port = process.env.PORT || 3000;

// * Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());

// * Routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", empRoutes);
app.use("/", commentRoutes);

// * Creating a web server
app.listen(port, () => console.log(`Listening on Port ${port}...`));

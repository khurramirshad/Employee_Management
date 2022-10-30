const express = require("express");
const router = express.Router();

const empController = require("../controllers/empController");
const authController = require("../controllers/authController");

router
  .route("/api/emp")
  .post(authController.hasAuthorization, empController.createEmp)
  .get(authController.hasAuthorization, empController.getEmp);

router
  .route("/api/emp/:me")
  .get(authController.hasAuthorization, empController.getEmpById)
  .put(authController.hasAuthorization, empController.updateEmpById)
  .delete(authController.hasAuthorization, empController.deleteEmpById);

module.exports = router;

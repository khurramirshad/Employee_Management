const empService = require("../services/empServices");
const ErrorHandler = require("../helpers/dbErrorHandler");
const Response = require("../helpers/apiResponse");

const createEmp = async (req, res) => {
  try {
    const emp = await empService.create({ ...req.body });
    Response(null, res, 200, "Employee created successfully", emp);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getEmp = async (req, res) => {
  try {
    const emp = await empService.list();
    Response(null, res, 200, "Employee's List", emp);
  } catch (err) {
    return res.status(400).json({
      error: ErrorHandler(err),
    });
  }
};

const getEmpById = async (req, res) => {
  try {
    const emp = await empService.read(req);
    if (!emp) {
      Response(true, res, 404, "Employee not found", emp);
    } else {
      Response(null, res, 200, "Employee's List", emp);
    }
  } catch (err) {
    Response(null, res, 400, "Could not find Employee", emp);
  }
};

const updateEmpById = async (req, res) => {
  try {
    const emp = await empService.update({ ...req.body, ...req.params });
    if (!emp) {
      Response(true, res, 404, "Employee updated failed", emp);
    } else {
      Response(null, res, 200, "Employee updated successfully", emp);
    }
  } catch (err) {
    Response(null, res, 400, "Failed", emp);
  }
};

const deleteEmpById = async (req, res) => {
  try {
    const emp = await empService.remove({ ...req.params });
    if (!emp) {
      Response(true, res, 404, "Employee deleted failed", emp);
    } else {
      Response(true, res, 404, "Employee deleted successfully", emp);
    }
  } catch (err) {
    Response(null, res, 400, "Failed", emp);
  }
};

const empController = {
  createEmp,
  getEmp,
  getEmpById,
  updateEmpById,
  deleteEmpById,
};

module.exports = empController;

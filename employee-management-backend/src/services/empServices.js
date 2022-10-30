const Employee = require("../models/empModel");

const create = async (body) => {
  const { firstName, lastName, username, email, address, role } = body;
  const emp = await new Employee({
    firstName,
    lastName,
    username,
    email,
    address,
    role,
  });
  await emp.save();
  return emp;
};

const list = async () => {
  const emp = await Employee.find();
  return emp;
};

const read = async (req) => {
  const emp = await Employee.findById(req.params.me);
  return emp;
};

const update = async (body) => {
  const emp = await Employee.findByIdAndUpdate(body.me, {
    $set: {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      address: body.address,
      role: body.role,
    },
  });
  emp.updatedAt = Date.now();
  await emp.save();
  emp.hashedPassword = undefined;
  emp.salt = undefined;
  return emp;
};

const remove = async (body) => {
  const emp = await Employee.findByIdAndDelete(body.me);
  emp.hashedPassword = undefined;
  emp.salt = undefined;
  return emp;
};

const empService = {
  create,
  list,
  read,
  update,
  remove,
};

module.exports = empService;

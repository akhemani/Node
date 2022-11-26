const express = require("express");
const routes = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/userController");

routes.route("/").get(getAllUsers).post(createUser);
routes.route("/:id").get(getUserById).patch(updateUser).delete(deleteUserById);

module.exports = routes;

const express = require("express");
const userController = require("./../controller/user");
const routes = express.Router();

routes
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUserById)
  .delete("/:id", userController.deleteUser);
routes.post("/", userController.addUser);
routes.put("/", userController.updateUser);

module.exports = routes;

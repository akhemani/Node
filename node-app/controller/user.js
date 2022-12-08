const fs = require("fs");

const getAllUsers = (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/../data/users.json", "utf8")
    );
    if (!users.length) throw new Error("Error in reading db...");
    res.status(200).json({
      status: "success",
      total: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const getUserById = (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/../data/users.json", "utf8")
    );
    if (!users.length) throw new Error("Error in reading db...");
    const user = users.find((user) => user.id === req.params.id * 1);
    if (!user) {
      res.status(404).json({
        status: "success",
        message: "user not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        user,
      });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const addUser = (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/../data/users.json", "utf8")
    );
    const newUsers = [...users, req.body.user];
    fs.writeFile(
      __dirname + "/../data/users.json",
      JSON.stringify(newUsers, null, 2),
      (err) => {
        if (err) {
          res.status(500).json({
            status: "fail",
            message: "Could not create user",
          });
        } else {
          res.status(201).json({
            status: "success",
            message: "user created",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/../data/users.json", "utf8")
    );
    const updatedUsers = users.filter((user) => user.id !== req.params.id * 1);
    fs.writeFile(
      __dirname + "/../data/users.json",
      JSON.stringify(updatedUsers, null, 2),
      (err) => {
        if (err) {
          res.status(500).json({
            status: "fail",
            message: "Could not delete user",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user deleted",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

const updateUser = (req, res) => {
  try {
    const users = JSON.parse(
      fs.readFileSync(__dirname + "/../data/users.json", "utf8")
    );
    const { id } = req.body.user;
    const index = users.findIndex((user) => user.id === id * 1);
    if (index == -1) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const updatedUsers = [...users];
    updatedUsers[index] = { ...req.body.user };
    fs.writeFile(
      __dirname + "/../data/users.json",
      JSON.stringify(updatedUsers, null, 2),
      (err) => {
        if (err) {
          res.status(500).json({
            status: "fail",
            message: "Could not update user",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user updated",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};

module.exports = { getAllUsers, getUserById, addUser, deleteUser, updateUser };

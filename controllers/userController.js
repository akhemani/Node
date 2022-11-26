const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    total: users.length,
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  console.log("body", req.body);
  const newUser = Object.assign(
    { id: users[users.length - 1].id + 1 },
    req.body
  );
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) res.status(400).json({ status: "failed", error: err });
    }
  );
  res.status(201).json({ status: "successfully created" });
};

exports.getUserById = (req, res) => {
  const user = users.find((user) => user._id === req.params.id);
  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: "success",
      data: "no item found",
    });
  }
};

exports.updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id * 1);
  // console.log(tour);
  // console.log(req.body);
  if (user) {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: "success",
      data: "no item found",
    });
  }
};

exports.deleteUserById = (req, res) => {
  const user = users.find((user) => user._id === req.params.id);
  // console.log(tour);
  // console.log(req.body);
  if (user) {
    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(204).json({
      status: "success",
      data: "no item found",
    });
  }
};

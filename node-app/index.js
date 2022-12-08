const express = require("express");
var cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);

module.exports = app;

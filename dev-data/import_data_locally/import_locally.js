const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { dirname } = require("path");
const Tour = require("../../models/tourModel");

dotenv.config({ path: `${__dirname}/../../config.env` });

const dbURL = process.env.MONGODB_URL.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tour.create(toursData);
    console.log("Data loaded successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else {
  deleteData();
}

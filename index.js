const express = require("express");
const app = express();
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middleware to post data
console.log(process.env.ENVIRONMENT);
console.log(process.env.ENVIRONMENT === "development");
app.use(express.json());
if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// ignore this
// app.get("/static", (req, res) => {
//   res.status(200).sendFile(`${__dirname}/public/demo.html`);
// });

module.exports = app;

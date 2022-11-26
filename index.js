const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middleware to post data
app.use(express.json());
if (process.env.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(`${__dirname}/public`));
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// middleware to handler all other routes
app.all("*", (req, res, next) => {
  next(new AppError(`Failed to load ${req.originalUrl} resource`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;

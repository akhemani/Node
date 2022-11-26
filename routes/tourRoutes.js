const express = require("express");
const routes = express.Router();

const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteById,
  checkById,
  checkTour,
  getTourStats,
  getMonthsByYear,
} = require("../controllers/tourController");

// routes.param("id", checkById);

routes.route("/").get(getAllTours).post(createTour);
routes.route("/toursByYear/:year").get(getMonthsByYear);
routes.route("/tour-stats").get(getTourStats);
routes.route("/:id").get(getTourById).patch(updateTour).delete(deleteById);

module.exports = routes;

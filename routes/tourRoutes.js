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
} = require("../controllers/tourController");

routes.param("id", checkById);

routes.route("/").get(getAllTours).post(checkTour, createTour);
routes.route("/:id").get(getTourById).patch(updateTour).delete(deleteById);

module.exports = routes;

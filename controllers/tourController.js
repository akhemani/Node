const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    total: tours.length,
    data: {
      tours,
    },
  });
};

exports.checkTour = (req, res, next) => {
  console.log("Inside check tour body", req.body);
  if (!req.body.name || !req.body.duration) {
    return res
      .status(400)
      .json({ status: "fail", error: "name or duration is missing" });
  }
  next();
};

exports.createTour = (req, res) => {
  console.log("body", req.body);
  const newTour = Object.assign(
    { id: tours[tours.length - 1].id + 1 },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.status(400).json({ status: "failed", error: err });
    }
  );
  res.status(201).json({ status: "successfully created" });
};

exports.checkById = (req, res, next, val) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  console.log(`value -> ${val}`);
  if (tour) {
    return res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  }
  next();
};

exports.getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  if (tour) {
    res.status(200).json({
      status: "success",
      data: {
        tour,
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

exports.updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  console.log(tour);
  console.log(req.body);
  if (tour) {
    res.status(200).json({
      status: "success",
      data: {
        tour,
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

exports.deleteById = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  console.log(tour);
  console.log(req.body);
  if (tour) {
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

const Tour = require("./../models/tourModel");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.getMonthsByYear = catchAsync(async (req, res, next) => {
  const year = req.params.year;
  const tours = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $sort: {
        startDates: 1,
      },
    },
    // {
    //   $project: {
    //     name: 1,
    //     startDates: 1,
    //     price: 1,
    //     _id: 0,
    //   },
    // },
    {
      $group: {
        _id: { $month: "$startDates" },
        totalTours: { $sum: 1 },
        tours: { $push: "$name" },
        avgPrice: { $avg: "$price" },
      },
    },
    {
      $sort: {
        totalTours: 1,
      },
    },
    {
      $addFields: {
        month: "$_id",
      },
    },
    {
      $project: {
        totalTours: 1,
        tours: 1,
        avgPrice: 1,
        month: 1,
        _id: 0,
      },
    },
    {
      $limit: 40,
    },
  ]);
  res.status(200).json({
    status: "success",
    total: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const tours = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4 } },
    },
    {
      $group: {
        // _id: null,
        // _id: { $toUpper: '$difficulty' },
        _id: "$difficulty",
        numTours: { $sum: 1 },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        avgPrice: { $avg: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    total: tours.length,
    data: {
      tours,
    },
  });
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .pagination()
    .fields()
    .sort();

  const tours = await features.query;
  res.status(200).json({
    status: "success",
    total: tours.length,
    data: {
      tours,
    },
  });
});

// exports.checkTour = (req, res, next) => {
//   console.log("Inside check tour body", req.body);
//   if (!req.body.name || !req.body.duration) {
//     return res
//       .status(400)
//       .json({ status: "fail", error: "name or duration is missing" });
//   }
//   next();
// };

exports.createTour = catchAsync(async (req, res, next) => {
  const createdTour = await Tour.create(req.body);
  res.status(201).json({
    statusText: "successfully created",
    data: {
      tour: createdTour,
    },
  });
});

// exports.checkById = (req, res, next, val) => {
//   const tour = tours.find((tour) => tour.id === req.params.id * 1);
//   console.log(`value -> ${val}`);
//   if (tour) {
//     return res.status(200).json({
//       status: "success",
//       data: {
//         tour,
//       },
//     });
//   }
//   next();
// };

exports.getTourById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators,
  });
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteById = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "successfully deleted",
  });
});

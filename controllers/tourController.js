const Tour = require("./../models/tourModel");
const ApiFeatures = require("../utils/apiFeatures");

exports.getMonthsByYear = async (req, res) => {
  try {
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
        $limit: 40
      }
    ]);
    res.status(200).json({
      status: "success",
      total: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Could not fetch all tours",
      err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Could not fetch all tours",
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    // const tours = await Tour.find();
    // const tours = await Tour.find(req.query);

    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .pagination()
      .fields()
      .sort();

    const tours = await features.query;

    // const tours = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("rating")
    //   .equals(4.9);
    res.status(200).json({
      status: "success",
      total: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Could not fetch all tours",
    });
  }
};

// exports.checkTour = (req, res, next) => {
//   console.log("Inside check tour body", req.body);
//   if (!req.body.name || !req.body.duration) {
//     return res
//       .status(400)
//       .json({ status: "fail", error: "name or duration is missing" });
//   }
//   next();
// };

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour(req.body);
    // newTour.save();
    const createdTour = await Tour.create(req.body);
    res.status(201).json({
      statusText: "successfully created",
      data: {
        tour: createdTour,
      },
    });
  } catch (err) {
    res.status(400).json({ statusText: "Invalid data", err });
  }
};

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

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "success",
      data: "no item found",
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "successfully deleted",
    });
  } catch (err) {
    res.status(204).json({
      status: "error",
      data: err,
    });
  }
};

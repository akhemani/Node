const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = express.Router();
const userRouter = express.Router();

// middleware to post data
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// this will be treated as top level code [i.e will run outside event loop because this is not inside any callback]
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    total: tours.length,
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  console.log('body', req.body);
  const newTour = Object.assign(
    { id: tours[tours.length - 1].id + 1 },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) res.status(400).json({ status: 'failed', error: err });
    }
  );
  res.status(201).json({ status: 'successfully created' });
};

const getTourById = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

const updateTour = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  console.log(tour);
  console.log(req.body);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

const deleteById = (req, res) => {
  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  console.log(tour);
  console.log(req.body);
  if (tour) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    total: users.length,
    data: {
      users,
    },
  });
};

const createUser = (req, res) => {
  console.log('body', req.body);
  const newUser = Object.assign(
    { id: users[users.length - 1].id + 1 },
    req.body
  );
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      if (err) res.status(400).json({ status: 'failed', error: err });
    }
  );
  res.status(201).json({ status: 'successfully created' });
};

const getUserById = (req, res) => {
  const user = users.find((user) => user._id === req.params.id);
  if (user) {
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id * 1);
  // console.log(tour);
  // console.log(req.body);
  if (user) {
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } else {
    // for server has succesfully processed the request but found no resource
    // res.status(204).json({
    res.status(200).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

const deleteUserById = (req, res) => {
  const user = users.find((user) => user.id === req.params.id * 1);
  // console.log(tour);
  // console.log(req.body);
  if (user) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: 'no item found',
    });
  }
};

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteById);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUserById);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

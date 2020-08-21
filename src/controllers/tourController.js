const fs = require('fs');

const toursFileName = `${__dirname}/../../dev-data/data/tours.json`;
const tours = JSON.parse(fs.readFileSync(toursFileName));

exports.index = (req, res) => {
  res.json({
    status: 'success',
    data: tours,
  });
};

exports.get = (req, res) => {
  const tour = findTourById(req.params.id);

  res.json({
    status: 'success',
    data: tour,
  });
};

exports.update = async (req, res) => {
  const tour = findTourById(req.params.id);

  tours.filter((el) => {
    if (el._id === req.params.id) {
      el.name = req.body.name;
    }
  });

  await saveTours()
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500);
      console.log(err.message);
    });

  res.send();
};

exports.delete = async (req, res) => {
  const tour = findTourById(req.params.id);

  tours.splice(tours.findIndex((el) => el._id === req.params.id, 1));
  console.log(findTourById(req.params.id));

  await saveTours()
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500);
      console.log(err.message);
    });

  res.send();
};

exports.add = async (req, res) => {
  const newId = tours[tours.length - 1]._id + 1;
  const newTour = Object.assign({ _id: newId }, req.body);

  tours.push(newTour);

  await saveTours()
    .then(() => {
      res.status(201);
    })
    .catch((err) => {
      res.status(500);
      console.log(err.message);
    });

  res.send();
};

exports.handleInvalidIdParam = (req, res, next, id) => {
  if (Number.isInteger(Number(id))) {
    return res.status(400).json({
      status: 'failed',
      message: 'The :id parameter is invalid',
    });
  }

  next();
};

exports.handleNotExistingTour = (req, res, next, id) => {
  if (!findTourById(id)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });

    return;
  }

  next();
};

function findTourById(id) {
  return tours.find((el) => el._id === id);
}

function saveTours() {
  return new Promise((resolve, reject) => {
    fs.writeFile(toursFileName, JSON.stringify(tours), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

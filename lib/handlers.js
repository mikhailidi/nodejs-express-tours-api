const fs = require('fs');
const toursFileName = `${__dirname}/../dev-data/data/tours.json`;
const tours = JSON.parse(fs.readFileSync(toursFileName));

exports.home = (req, res) => {
  res.json({ home: true });
};

exports.getTours = (req, res) => {
  res.json({
    status: 'success',
    data: tours,
  });
};

exports.getTour = (req, res) => {
  const tour = findTourById(req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });

    return;
  }

  res.json({
    status: 'success',
    data: tour,
  });
};

exports.updateTour = async (req, res) => {
  const tour = findTourById(req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });

    return;
  }

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

exports.deleteTour = async (req, res) => {
  const tour = findTourById(req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });

    return;
  }

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

exports.addTour = async (req, res) => {
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

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

exports.addTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1]._id + 1;
  const newTour = Object.assign({ _id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(toursFileName, JSON.stringify(tours), (err) => {
    if (!err) {
      res.status(201);
    } else {
      res.status(500);
    }

    res.send();
  });
};

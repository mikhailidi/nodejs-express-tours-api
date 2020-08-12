const toursHandler = require('./toursHandler');
const usersHandler = require('./usersHandler');

exports.home = (req, res) => {
  res.json({ home: true });
};

exports.toursHandler = toursHandler;
exports.usersHandler = usersHandler;

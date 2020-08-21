const toursHandler = require('./tours.route');
const usersHandler = require('./user.route');

exports.home = (req, res) => {
  res.json({ home: true });
};

exports.toursHandler = toursHandler;
exports.usersHandler = usersHandler;

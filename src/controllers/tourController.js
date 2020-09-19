const tourService = require('../services/tour.service');

exports.index = async (req, res) => {
  const tours = await tourService.findAll();

  return res.json({
    status: 'success',
    data: tours,
  });
};

exports.get = async (req, res) => {
  const tour = await tourService.findById(req.params.id);

  return res.json({
    status: 'success',
    data: tour,
  });
};

exports.update = async (req, res) => {
  try {
    await tourService.updateById(req.params.id, req.body);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await tourService.deleteById(req.params.id);

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.add = async (req, res) => {
  try {
    await tourService.add(req.body);

    return res.status(201).send();
  } catch (err) {
    // Throw specific exception here
    return res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
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

exports.handleNotExistingTour = async (req, res, next, id) => {
  const tour = await tourService.findById(id);
  if (!tour) {
    return res.status(404).json({
      status: 'not_found',
      message: 'Tour not found',
    });
  }

  next();
};

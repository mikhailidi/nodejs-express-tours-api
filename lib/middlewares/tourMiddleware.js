exports.addTour = (req, res, next) => {
  const errors = [];
  console.log(req.body);

  if (req.body.name === undefined || req.body.name === '') {
    errors.push('Name is not defined');
  }
  if (req.body.description === undefined || req.body.description === '') {
    errors.push('Description is not defined');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'failed',
      message: 'Validation error',
      errors,
    });
  }

  next();
};

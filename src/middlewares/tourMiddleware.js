const { body, validationResult } = require('express-validator');

exports.addTour = async (req, res, next) => {
  await body('name').exists({ checkNull: true }).isLength({ min: 3 }).run(req);
  await body('description')
    .exists({ checkNull: true })
    .isLength({ min: 6 })
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      status: 'failed',
      message: 'Validation error',
      errors: result.array(),
    });
  }

  next();
};

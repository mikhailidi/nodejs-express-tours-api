import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const addTour = async (req: Request, res: Response, next: NextFunction) => {
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

export { addTour as addTourMiddleware };

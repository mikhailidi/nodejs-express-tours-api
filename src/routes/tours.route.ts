import { Router } from 'express';
import TourController from '../controllers/tourController';
import { addTourMiddleware } from '../middlewares/tourMiddleware';

const router: Router = Router();

router.param('id', TourController.handleInvalidIdParam);
router.param('id', TourController.handleNotExistingTour);

router
  .route('/')
  .get(TourController.index)
  .post(addTourMiddleware, TourController.store);

router
  .route('/:id')
  .get(TourController.get)
  .patch(TourController.update)
  .delete(TourController.delete);

export default router;

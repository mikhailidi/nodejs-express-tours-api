const { Router } = require('express');
const controller = require('../controllers/tourController');
const router = Router();

router.param('id', controller.handleInvalidIdParam);

router.param('id', controller.handleNotExistingTour);

router.route('/').get(controller.index).post(controller.add);

router
  .route('/:id')
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;

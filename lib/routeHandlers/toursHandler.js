const { Router } = require('express');
const controller = require('../controllers/tourController');
const router = Router();

router.param('id', (req, res, next, val) => {
  controller.handleInvalidIdParam(req, res, next, val);
});

router.param('id', (req, res, next, val) => {
  controller.handleNotExistingTour(req, res, next, val);
});

router.route('/').get(controller.index).post(controller.add);

router
  .route('/:id')
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;

const { Router } = require('express');
const controller = require('../controllers/tourController');
const router = Router();

router.route('/').get(controller.index).post(controller.add);

router
  .route('/:id')
  .get(controller.get)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;

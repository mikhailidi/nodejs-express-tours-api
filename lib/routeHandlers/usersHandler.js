const { Router } = require('express');
const controller = require('../controllers/userController');
const router = Router();

router.route('/').get(controller.index).post(controller.create);

module.exports = router;

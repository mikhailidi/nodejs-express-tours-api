import { Router } from 'express';
import UserController from '../controllers/userController';

const router: Router = Router();

router.route('/').get(UserController.index).post(UserController.store);

export default router;

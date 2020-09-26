import { Request, Response } from 'express';
import User from '../models/User';

const users = [];

class UserController {
  async index(req: Request, res: Response) {
    res.json({
      status: 'success',
      data: users,
    });
  }

  async store(req: Request, res: Response) {
    const requestBody = req.body;

    users.push(new User(requestBody.name, requestBody.email));

    res.status(201).send();
  }
}

export default new UserController();

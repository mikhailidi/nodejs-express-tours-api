import { Request, Response } from 'express';
import toursHandler from './tours.route';
import usersHandler from './user.route';

const homeRoute = (req: Request, res: Response) => {
  res.json({ home: true });
};

export default { toursHandler, usersHandler, homeRoute };

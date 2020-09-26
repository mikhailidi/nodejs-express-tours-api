import { addTourMiddleware } from '../../../src/middlewares/tourMiddleware';
import { Request, Response, NextFunction } from 'express';

test('should pass the middleware with proper data', async () => {
  const req = {
    body: {
      name: 'Normal name',
      description: 'Proper long description',
    },
  } as Request;
  const res = {} as Response;
  const next = (jest.fn() as NextFunction) as any;

  await addTourMiddleware(req, res, next);
  expect(next.mock.calls.length).toBe(1);
});

test('should return 400 response', async () => {
  const req = {
    body: {
      description: null,
    },
  } as Request;
  const res = (global.setUpExpressMocks() as Response) as any;
  const next = (jest.fn() as NextFunction) as any;

  await addTourMiddleware(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json.mock.calls.length).toBe(1);
  expect(next.mock.calls.length).toBe(0);
});

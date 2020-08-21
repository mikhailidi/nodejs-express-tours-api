const { addTour } = require('../../../src/middlewares/tourMiddleware');

test('should pass the middleware with proper data', async () => {
  const req = {
    body: {
      name: 'Normal name',
      description: 'Proper long description',
    },
  };
  const res = {};
  const next = jest.fn();

  await addTour(req, res, next);
  expect(next.mock.calls.length).toBe(1);
});

test('should return 400 response', async () => {
  const req = {
    body: {
      description: null,
    },
  };
  const res = setUpExpressMocks();
  const next = jest.fn();

  await addTour(req, res, next);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json.mock.calls.length).toBe(1);
  expect(next.mock.calls.length).toBe(0);
});

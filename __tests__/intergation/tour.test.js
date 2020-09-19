const supertest = require('supertest');
const app = require('../../src/app');

const request = supertest(app);

it('makes GET call to the /', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({ home: true });
});

it('makes call to /api/v1/tours', async () => {
  const response = await request.get('/api/v1/tours');
  expect(response.status).toBe(200);

  const body = JSON.parse(response.text);
  expect(body.status).toBe('success');
});

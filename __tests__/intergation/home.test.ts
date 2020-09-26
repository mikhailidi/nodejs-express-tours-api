import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);
it('makes GET call to the /', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({ home: true });
});

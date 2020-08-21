const request = require('supertest');
const app = require('../../src/app');
const tours = require('../../dev-data/data/tours');

it('makes GET call to the /', () => {
  return request(app)
    .get('/')
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ home: true });
    });
});

it('makes call to /api/v1/tours', () => {
  return request(app)
    .get('/api/v1/tours')
    .then((response) => {
      expect(response.status).toBe(200);
      const body = JSON.parse(response.text);
      const data = body.data;
      expect(body.status).toBe('success');
      expect(data).toEqual(tours);
    });
});

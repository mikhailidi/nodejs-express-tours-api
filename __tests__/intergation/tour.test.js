const supertest = require('supertest');
const app = require('../../src/app');
const TourSchema = require('../../src/models/Tour');

const request = supertest(app);

it('tests tour index endpoint', async () => {
  const response = await request.get('/api/v1/tours');
  expect(response.status).toBe(200);

  const body = JSON.parse(response.text);
  expect(body.status).toBe('success');
});

it('tests tour show endpoint', async () => {
  const tour = new TourSchema({
    name: 'test tour',
    price: 666,
    rating: 5,
  });

  await tour.save();

  const response = await request.get(`/api/v1/tours/${tour._id}`);
  expect(response.status).toBe(200);

  const responseBody = JSON.parse(response.text);
  const expectedResponseBody = {
    status: 'success',
    data: {
      rating: tour.rating,
      _id: String(tour._id),
      name: tour.name,
      price: tour.price,
    },
  };
  expect(responseBody).toMatchObject(expectedResponseBody);
});

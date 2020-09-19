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
    description: 'Tour description',
    summary: 'This is a short summary of the tour',
    price: 666,
    duration: 5,
    difficulty: 10,
    maxGroupSize: 35,
    imageCover: '/test/image.jpg',
  });

  await tour.save();

  const response = await request.get(`/api/v1/tours/${tour._id}`);
  expect(response.status).toBe(200);

  const responseBody = JSON.parse(response.text);
  const expectedResponseBody = {
    status: 'success',
    data: {
      _id: String(tour._id),
      name: tour.name,
      description: tour.description,
      price: tour.price,
    },
  };
  expect(responseBody).toMatchObject(expectedResponseBody);
});

it('tests a new tour creation', async () => {
  const requestBody = {
    name: 'New Amazing Tour',
    description: 'Super long tour description',
    summary: 'This is a short summary of the tour',
    price: 666,
    duration: 5,
    difficulty: 10,
    maxGroupSize: 35,
    imageCover: '/test/image.jpg',
  };
  const response = await request.post('/api/v1/tours').send(requestBody);
  expect(response.status).toBe(201);

  const newlyCreatedTour = await TourSchema.findOne({ name: requestBody.name });
  expect(newlyCreatedTour).toMatchObject(requestBody);
});

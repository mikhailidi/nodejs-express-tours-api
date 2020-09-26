import supertest from 'supertest';
import app from '../../src/app';
import Tour, { ITour } from '../../src/models/Tour';

const request = supertest(app);

describe('index endpoint', () => {
  beforeEach(async () => {
    const tour: ITour = new Tour({
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

    const tour2: ITour = new Tour({
      name: 'test tour2',
      description: 'Tour description',
      summary: 'This is a short summary of the tour',
      price: 485,
      duration: 1,
      difficulty: 3,
      maxGroupSize: 8,
      imageCover: '/test/image-1.jpg',
    });

    await tour2.save();
  });

  it('tests with search', async () => {
    const response = await request.get(
      '/api/v1/tours?fields=price,name,duration&sort=price'
    );
    expect(response.status).toBe(200);

    const body = JSON.parse(response.text);
    expect(body.status).toBe('success');
    expect(body.data).toMatchObject([
      {
        name: 'test tour2',
        price: 485,
        duration: 1,
      },
      {
        name: 'test tour',
        price: 666,
        duration: 5,
      },
    ]);
  });
});

it('tests tour show endpoint', async () => {
  const tour: ITour = new Tour({
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

  const newlyCreatedTour: ITour = await Tour.findOne({
    name: requestBody.name,
  });
  expect(newlyCreatedTour).toMatchObject(requestBody);
});

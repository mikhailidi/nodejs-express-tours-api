const express = require('express');
const app = express();
const routeHandler = require('./lib/handlers');
const port = 3000;

app.use(express.json());

app.get('/', routeHandler.home);

app.get('/api/v1/tours', routeHandler.getTours);
app.get('/api/v1/tours/:id', routeHandler.getTour);

app.post('/api/v1/tours', routeHandler.addTour);

app.listen(port, () => {
  console.log(`Natour app started on port ${port}`);
});

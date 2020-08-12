const express = require('express');
const app = express();
const routeHandler = require('./lib/handlers');
const port = 3000;

app.use(express.json());

app.get('/', routeHandler.home);

app.get('/api/v1/tours', routeHandler.getTours);
app
  .route('/api/v1/tours')
  .get(routeHandler.getTours)
  .post(routeHandler.addTour);

app
  .route('/api/v1/tours/:id')
  .get(routeHandler.getTour)
  .patch(routeHandler.updateTour)
  .delete(routeHandler.deleteTour);

app.listen(port, () => {
  console.log(`Natour app started on port ${port}`);
});

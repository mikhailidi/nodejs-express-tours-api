const express = require('express');
const app = express();
const routeHandler = require('./lib/routeHandlers/handler');

app.use(express.json());

app.get('/', routeHandler.home);
app.use('/api/v1/tours', routeHandler.toursHandler);
app.use('/api/v1/users', routeHandler.usersHandler);

module.exports = app;
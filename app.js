const express = require('express');
const app = express();
const routeHandler = require('./lib/routeHandlers/handler');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', routeHandler.home);
app.use('/api/v1/tours', routeHandler.toursHandler);
app.use('/api/v1/users', routeHandler.usersHandler);

module.exports = app;

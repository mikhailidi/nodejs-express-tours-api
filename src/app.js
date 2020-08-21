const express = require('express');
const routeHandler = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../../public`));

app.get('/', routeHandler.home);
app.use('/api/v1/tours', routeHandler.toursHandler);
app.use('/api/v1/users', routeHandler.usersHandler);

module.exports = app;

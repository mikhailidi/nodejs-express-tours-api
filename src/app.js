const express = require('express');
const routeHandler = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.static(`${__dirname}/../../public`));
  }

  routes() {
    this.express.get('/', routeHandler.home);
    this.express.use('/api/v1/tours', routeHandler.toursHandler);
    this.express.use('/api/v1/users', routeHandler.usersHandler);
  }
}

module.exports = new App().express;

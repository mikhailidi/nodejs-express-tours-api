import express, { Application } from 'express';
import routeHandler from './routes';

class App {
  public express: Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(express.static(`${__dirname}/../../public`));
  }

  private routes(): void {
    this.express.get('/', routeHandler.homeRoute);
    this.express.use('/api/v1/tours', routeHandler.toursHandler);
    this.express.use('/api/v1/users', routeHandler.usersHandler);
  }
}

export default new App().express;

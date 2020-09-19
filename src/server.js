const dotenv = require('dotenv');
const database = require('./helpers/database');
const app = require('./app');

class Server {
  constructor() {
    this.setUpDotenv();
    this.connectToDatabase();

    this.listen();
  }

  setUpDotenv() {
    dotenv.config({
      path: './.env',
    });
  }

  connectToDatabase() {
    database.connect();
  }

  listen() {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Natour app started on port ${port}`);
    });
  }
}

new Server();

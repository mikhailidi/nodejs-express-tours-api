import { config as dotenvConfig } from 'dotenv';
import { connect as connectToDatabase, IConnect } from './helpers/database';
import app from './app';

class Server {
  constructor() {
    this.setUpDotenv();
    this.connectToDb();

    this.listen();
  }

  private setUpDotenv(): void {
    dotenvConfig({
      path: './.env',
    });
  }

  private connectToDb(): void {
    const dbConnection: IConnect = {
      db: process.env.DB_CONNECTION.replace(
        '<PASSWORD>',
        process.env.DB_PASSWORD
      ),
    };
    connectToDatabase(dbConnection);
  }

  private listen(): void {
    const port = +process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`✅ Natour app started on port ${port}`);
    });
  }
}

new Server();

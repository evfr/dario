import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import UserController from './controllers/UserController';
import DbService from './services/DbService';
import ContactsImportController from './controllers/ContactsImportController';
import reportController from './controllers/ReportController';
import ReportController from './controllers/ReportController';

class Server {
  private app: express.Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
  }

  private configureRoutes(): void {
    const userController = new UserController();
    const importController = new ContactsImportController();
    const reportController = new ReportController();

    this.app.get('/import', importController.import);
  
    this.app.get('/form', (req, res) => {
      res.sendFile('form.html', { root: 'public' });
    });

    this.app.post('/submit', userController.validateUserData, userController.getUserDevices);

    this.app.get('/report', reportController.report);
  }

  public async start(): Promise<void> {
    await DbService.getDb();
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const port = 3000;
const server = new Server(port);
server.start();

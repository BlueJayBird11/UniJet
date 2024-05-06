// yarn build
// yarn dev

import express, { Application, Request, Response } from "express";
import cors from "cors";
import PassengerRouter from "./src/router/PassengerRouter";
import ClassInfoRouter from "./src/router/ClassInfoRouter";
import LoginRouter from "./src/router/LoginRouter";
import ForgotPassword from "./src/router/ForgotPassword";
import StatusRouter from "./src/router/SettingsRouter";
import DriverRouter from "./src/router/DriverRouter";
import SMSVerificationRoute from './src/router/smsVerification';
import RequestRouter from "./src/router/RequestRouter";
import HistoryRouter from './src/router/HistoryRouter';
import SchedulerRouter from './src/router/SchedulerRouter';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/v1/passengers", PassengerRouter);
    this.app.use("/api/v1/drivers", DriverRouter);
    this.app.use("/api/v1/classInfo", ClassInfoRouter);
    this.app.use("/api/v1/history", HistoryRouter);
    this.app.use("/api/v1/scheduler", SchedulerRouter);
    this.app.use("/api/v1/login", LoginRouter);
    this.app.use("/api/v1/settings", StatusRouter);
    this.app.use("/api/v1/requests", RequestRouter);
    this.app.use("/api", ForgotPassword);
    this.app.use("/api", SMSVerificationRoute);

  }
}

// const port: number = 8000;
const port: number = +process.env.PORT! || 3001;

const app = new App().app;

app.listen(port, () => {
  console.log(`[server]: ✅ Server is running at http://localhost:${port}`);
});

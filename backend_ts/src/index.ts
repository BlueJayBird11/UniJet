// yarn build
// yarn dev

import express, { Application, Request, Response } from "express";
import cors from "cors";
import PassengerRouter from "./router/PassengerRouter";
import ClassInfoRouter from "./router/ClassInfoRouter";
import LoginRouter from "./router/LoginRouter";
import ForgotPassword from "./router/ForgotPassword";

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
    this.app.use("/api/v1/classInfo", ClassInfoRouter);
    this.app.use("/api/v1/login", LoginRouter);
    this.app.use("/api", ForgotPassword);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log(`[server]: ✅ Server is running at http://localhost:${port}`);
});

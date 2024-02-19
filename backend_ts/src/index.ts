// yarn build
// yarn dev

import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import PassengerRouter from "./router/PassengerRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseSync();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("welcome home");
    });
    this.app.use("/api/v1/passengers", PassengerRouter);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log(`[server]: ✅ Server is running at http://localhost:${port}`);
});
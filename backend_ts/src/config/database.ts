import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Passenger from "../model/Passenger";
import Driver from "../model/Driver";
import RegisteredAs from "../model/RegistaredAs";
dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.connectToPostgreSQL();
  }

  private async connectToPostgreSQL() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      models: [Passenger, Driver, RegisteredAs],
    });
    this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          "[server]: ✅ Postgres Connection has been established successfully."
        );
      })
      .catch((err) => {
        console.log(
          "[server]: ❌ Unable to connect to the postgresql database",
          err
        );
      });
  }
}

export default Database;

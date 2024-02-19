console.log("Hello");

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import db from "./db/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Get all passengers
app.get("/api/v1/passengers", async (req, res) => {
  try {
      const results = await db.query('SELECT * FROM passengers');
      console.log(results.rows);
      res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: {
              restaurants: results.rows
          },
      });
  } catch (err) {
      console.log(err);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// npx ts-node src/index.ts

// yarn build
// yarn dev
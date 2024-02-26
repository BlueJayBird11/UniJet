import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import bcrypt from "bcrypt";

class PassengerRoutes extends BaseRoutes {
  routes(): void {
    // CREATE PASSENGER
    this.router.post("", async (req, res) => {
      try {
        // console.log(req.body);

        const result = await pool.query(
          "SELECT * FROM passengers WHERE email = $1",
          [req.body.email]
        );

        console.log(result.rows.length);
        if (result.rows.length === 1) {
          res.status(409).json({
            message: "Email already in use.",
          });
          throw new Error("Email in use");
        } else {
          const hash = await bcrypt.hash(req.body.passwordHash, 10);
          const results = await pool.query(
            "INSERT INTO passengers (birthDate, email, passwordHash, phoneNumber, firstName, lastName, userStatus, carPool, rating, schedule) \
              VALUES ($1, $2, $3, $4, $5, $6, 0, $7, NULL, NULL) returning *",
            [
              req.body.birthDate,
              req.body.email,
              hash,
              req.body.phoneNumber,
              req.body.firstName,
              req.body.lastName,
              req.body.carPool,
            ]
          );

          res.status(201).json({
            status: "success",
            data: {
              passengers: results.rows[0],
            },
          });
        }
        // console.log(req.body);
      } catch (err) {
        console.log(err);
      }
    });

    // GET BY ID
    this.router.get("/:id", async (req, res) => {
      try {
        // console.log(req.params.id);
        const results = await pool.query(
          "SELECT * FROM passengers WHERE id = $1",
          [req.params.id]
        );
        res.status(200).json({
          status: "success",
          data: {
            passenger: results.rows[0],
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    // DELETE
    this.router.delete("/:id", async (req, res) => {
      try {
        // console.log(req.params.id);
        const results = await pool.query(
          "DELETE FROM passengers WHERE id = $1",
          [req.params.id]
        );
        res.status(204).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    // GET ALL
    this.router.get("", async (req, res) => {
      try {
        const results = await pool.query("SELECT * FROM passengers");
        // console.log(results);
        res.status(200).json({
          status: "success",
          results: results.rows.length,
          data: {
            passengers: results.rows,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    // UPDATE
    // this.router.put("/:id", async (req, res) => {
    //   try {
    //     const results = await pool.query("UPDATE passengers SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
    //         [req.body.name, req.body.location, req.body.price_range, req.params.id])
    //     // console.log(req.params.id);
    //     // console.log(req.body);
    //     console.log(results)
    //     res.status(200).json({
    //         status: "success",
    //         data: {
    //           passenger: results.rows[0],
    //         },
    //     });
    // } catch (err) {
    //     console.log(err);
    // }
    // });
  }
}

export default new PassengerRoutes().router;

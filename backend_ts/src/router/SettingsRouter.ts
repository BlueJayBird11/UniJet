
import BaseRoutes from "./base/BaseRouter";
import pool from "../db";


class StatusRoutes extends BaseRoutes {
    routes(): void {
        this.router.put("/status/:id", async (req, res) => {
            try {
              const newResults = await pool.query("UPDATE passengers SET userstatus = $2 WHERE id = $1 returning *",
                [req.params.id, req.body.newStatus])
                console.log(newResults.rows[0]);
              res.status(200).json({
                status: "success",
              });
            } catch (err) {
              console.log(err);
            }
          });

          this.router.put("/name/:id", async (req, res) => {
            try {
              const newResults = await pool.query("UPDATE passengers SET firstname = $2, lastname = $3 WHERE id = $1 returning *",
                [req.params.id, req.body.firstName, req.body.lastName])
      
                console.log(newResults.rows[0]);
              // console.log(results);
              res.status(200).json({
                status: "success",
              });
            } catch (err) {
              console.log(err);
            }
          });
          
          this.router.put("/email/:id", async (req, res) => {
            try {
              const newResults = await pool.query("UPDATE passengers SET email = $2 WHERE id = $1 returning *",
                [req.params.id, req.body.email])
      
                console.log(newResults.rows[0]);
              // console.log(results);
              res.status(200).json({
                status: "success",
              });
            } catch (err) {
              console.log(err);
            }
          });

          this.router.put("/status-driver/:id", async (req, res) => {
            try {
              const passengerid = req.params.id;
              const results = await pool.query(
                "SELECT * FROM registeredAs WHERE passengerID = $1",
                [passengerid]
              );
              if (results.rows.length != 1)
              {
                throw new Error("user not a passenger");
              }
              //if (results.rows.length )
              const user = results.rows[0]; 
              console.log(user);
              const newResults = await pool.query("UPDATE passengers SET userstatus = 2 WHERE id = $1 returning *",
                [req.params.id])
                console.log(newResults.rows[0]);
              const driverResults = await pool.query("SELECT driverid FROM drivers \
                  JOIN registeredas r ON r.driverid = drivers.id \
                  WHERE r.passengerid = $1 ", [req.params.id]);
              // console.log(results);
              res.status(200).json({
                status: "success",
                data: {
                  driverId: driverResults
                }
              });
            } catch (err) {
              res.status(400).json({
                status: "failed",
                message: err
              });
            }
          });

          this.router.get("/is-driver/:id", async (req, res) => {
            try { 
              let value: boolean = false
              const results = await pool.query(
                "SELECT * FROM registeredAs WHERE passengerID = $1",
                  [req.params.id]
              );
              if (results.rows.length !== 0)
                { 
                  value = true
                }
              res.status(200).json({
                status: "success",
                data: {
                  isDriver: value
                }
              });
            }
            catch (err) {
              res.status(400).json({
                status: "failed",
                message: err
              });
            }
          });
    }
}

export default new StatusRoutes().router;
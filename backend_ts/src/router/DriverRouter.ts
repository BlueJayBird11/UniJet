import BaseRoutes from "./base/BaseRouter";
import pool from "../db";

class DriverRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("", async (req, res) => {
      try {
        // const result = await pool.query(
        //   "SELECT * FROM passengers WHERE email = $1",
        //   [req.body.email]
        // );
        const resultDriver = await pool.query(
          "INSERT INTO drivers(licencePlate, registeredState, availableSeats, amountReceived, rating) \
              VALUES ($1, $2, $3, 0, 0) returning *",
          [req.body.licensePlate, req.body.registeredState, req.body.availableSeats]
        );
        const driver = resultDriver.rows[0]; 
        console.log(driver);

        const resultVehicle = await pool.query(
          "INSERT INTO vehicles(make, model, color, registeredYear) \
              VALUES ($1, $2, $3, $4) returning *",
          [req.body.make, req.body.model, req.body.color, req.body.registeredYear]
        );
        const vehicle = resultVehicle.rows[0]; 
        console.log(vehicle);

        const resultOwnsA = await pool.query(
          "INSERT INTO ownsA(driverID, vehicleID) \
              VALUES ($1, $2) returning *",
          [driver.id, vehicle.id]
        );
        const ownsA = resultOwnsA.rows[0]; 
        console.log(ownsA);

        const resultRegisteredAs = await pool.query(
          "INSERT INTO registeredAs(driverID, passengerID) \
              VALUES ($1, $2) returning *",
          [driver.id, req.body.passengerID]
        );
        const registeredAs = resultRegisteredAs.rows[0]; 
        console.log(registeredAs);

        res.status(201).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new DriverRoutes().router;

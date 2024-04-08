import BaseRoutes from "./base/BaseRouter";
import pool from "../db";
import { RiderType } from "../shared/types";

// {
//     name: "Ash",
//     rating: 5.0,
//     payMin: 9,
//     payMax: 11,
//     position: [32.541251162684404, -92.63578950465626],
//     destination: "Chase Bank"
// }

var requests: Array<RiderType> = [
  {
    name: "Ash",
    rating: 5.0,
    payMin: 9,
    payMax: 11,
    position: [32.541251162684404, -92.63578950465626],
    destination: "Chase Bank",
  },
];

class RequestRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/request", async (req, res) => {
      try {
        // console.log(req.body);
        console.log(req.body);
        const result = await pool.query(
          "SELECT * FROM passengers WHERE email = $1",
          [req.body.email]
        );

        requests.push({
          name: result.rows[0].firstName + " " + result.rows[0].lastName,
          rating: result.rows[0].rating,
          payMin: result.rows[0].payMin,
          payMax: result.rows[0].payMax,
          position: req.body.position,
          destination: req.body.destination,
        });

        console.log(result.rows.length);

        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        console.log(err);
      }
    });

    this.router.get("", async (req, res) => {
      try {
        res.status(200).json({
          status: "success",
          results: requests.length,
          data: {
            passengers: requests,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default new RequestRoutes().router;

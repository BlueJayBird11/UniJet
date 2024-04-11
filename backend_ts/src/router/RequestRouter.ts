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

        console.log(result.rows[0]);
        console.log(result.rows[0].firstname);

        requests.push({
          name: result.rows[0].firstname + " " + result.rows[0].lastname,
          rating: result.rows[0].rating,
          position: req.body.location,
          destination: req.body.destination,
        });

        console.log(result.rows.length);
        console.log(requests);

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

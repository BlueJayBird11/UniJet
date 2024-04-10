import BaseRoutes from "./base/BaseRouter";
import pool from "../db";

class HistoryRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("/passengers/:id", async (req, res) => {
            try {
                const id = BigInt(parseInt(req.params.id, 10));
                const results = await pool.query(`SELECT 
                    passengers.firstname, \ 
                    passengers.lastname, \
                    trip.endtime, \
                    trip.starttime, \
                    trip.earnings, \
                    trip.startloction AS startlocation, \
                    trip.endloction AS endlocation \
                    FROM public.history \
                    LEFT JOIN public.passengers ON passengers.id = history.passengerid \
                    LEFT JOIN public.drivers ON drivers.id = history.driverid \
                    LEFT JOIN public.trip ON trip.id = history.tripid \
                    WHERE drivers.id = $1 \
                    ORDER BY passengers.id ASC, drivers.id ASC, trip.id ASC;`,
                    [id]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        history: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/driverId/:id", async (req, res) => {
            try {
                const id = BigInt(parseInt(req.params.id, 10));
                const results = await pool.query(`SELECT 
                    registeredas.driverid \ 
                    FROM public.registeredas \
                    LEFT JOIN public.passengers ON passengers.id = registeredas.passengerid \
                    WHERE public.registeredas.passengerid = $1`,
                    [id]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        history: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });

        this.router.get("/drivers/:id", async (req, res) => {
            try {
                const id = BigInt(parseInt(req.params.id, 10));
                const results = await pool.query(`SELECT 
                    passengers.firstname, \ 
                    passengers.lastname, \
                    trip.endtime, \
                    trip.starttime, \
                    trip.earnings, \
                    trip.startloction AS startlocation, \
                    trip.endloction AS endlocation \
                    FROM public.trip \
                    LEFT JOIN public.history ON history.tripid = trip.id \
                    LEFT JOIN public.drivers ON drivers.id = history.driverid \
                    LEFT JOIN public.registeredas ON registeredas.driverid = drivers.id 
                    LEFT JOIN public.passengers ON passengers.id = registeredas.passengerid\
                    WHERE history.passengerid = $1`,
                    [id]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        history: results.rows
                    },
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    status: "error",
                    message: "Internal server error"
                });
            }
        });
    }
}

export default new HistoryRoutes().router;
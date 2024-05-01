import BaseRoutes from "./base/BaseRouter";
import pool from "../db";

class SchedulerRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("/subjects/", async (req, res) => {
            try {
                const results = await pool.query(`SELECT DISTINCT
                    classes.classsubject \ 
                    FROM public.classes \ 
                    ORDER BY classes.classsubject ASC;`,
                    );

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        subject: results.rows
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

        this.router.get("/subjects/course/:subj", async (req, res) => {
            try {
                const subj = req.params.subj
                const results = await pool.query(`SELECT DISTINCT
                    classes.coursenumber, \ 
                    classes.id \
                    FROM public.classes \
                    WHERE classsubject = $1 \
                    ORDER BY classes.coursenumber ASC;`,
                    [subj]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        course: results.rows
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

        this.router.get("/subjects/course/section/:classid", async (req, res) => {
            try {
                const classid = req.params.classid
                const results = await pool.query(`SELECT 
                    section.section, \ 
                    classinfo.sectionid \
                    FROM public.classinfo \
                    JOIN public.section ON section.id = classinfo.sectionid\
                    WHERE classid = $1 \
                    ORDER BY section.section ASC;`,
                    [classid]);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        section: results.rows
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

        this.router.get("/subjects/course/section/submit/:classid/:sectionid", async (req, res) => {
            try {
                const classid = req.params.classid
                const sectionid = req.params.sectionid
                const results = await pool.query(`SELECT 
                    daysofweek.daysofweek, \
                    buildings.buildingname, \ 
                    timeinformation.starttime, \ 
                    timeinformation.endtime, \ 
                    classes.classname \ 
                    FROM public.classinfo \
                    JOIN public.daysofweek ON daysofweek.id = classinfo.daysofweekid \
                    JOIN public.buildings ON buildings.id = classinfo.buildingid \
                    JOIN public.classes ON classes.id = classinfo.classid \ 
                    JOIN public.timeinformation ON timeinformation.id = classinfo.timeinfoid \
                    WHERE classid = $1 AND sectionid = $2;`,
                    [classid, sectionid],);

                console.log(results.rows);
                res.status(200).json({
                    status: "success",
                    results: results.rows.length,
                    data: {
                        slot: results.rows
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

        this.router.get("/addCourse/:classid/:sectionid/:className/:buildingname/:daysofweek/:starttime/:endtime/:passengerid", async (req, res) => {
            try {
                const classid = req.params.classid
                const sectionid = req.params.sectionid
                const classname = req.params.className
                const buildingname = req.params.buildingname
                const daysofweek = req.params.daysofweek
                const starttime = req.params.starttime
                const endtime = req.params.endtime
                const passengerid = req.params.passengerid
                const results = await pool.query(`UPDATE public.passengers
                SET schedule = COALESCE(schedule, '[]'::jsonb) || 
                              jsonb_build_array(
                                jsonb_build_object(
                                  'classid', $1::int,
                                  'sectionid', $2::int,
                                  'classname', $3::text,
                                  'buildingname', $4::text,
                                  'daysofweek', $5::text,
                                  'starttime', $6::text,
                                  'endtime', $7::text
                                )
                              )
                WHERE id = $8::int;`,
                [classid, sectionid, classname, buildingname, daysofweek, starttime, endtime, passengerid],);
                res.status(200).send(results);
                } catch (error) {
                console.error('Error while updating schedule:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        this.router.get("/viewCourses/:passengerid", async (req, res) => {
            const passengerid = req.params.passengerid
            try {
                const client = await pool.connect();
                const query = `
                    SELECT schedule 
                    FROM public.passengers 
                    WHERE id = $1
                    ORDER BY id ASC;
                `;
                const { rows } = await client.query(query, [passengerid]);
                client.release();
            
                if (rows.length === 0) {
                    return res.status(404).send('Passenger not found');
                }
            
                const schedule = rows[0].schedule;
            
                res.json(schedule); // Send the schedule array as JSON response
                } catch (error) {
                console.error('Error while fetching schedule:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        this.router.get("/deleteSchedule/:classid/:sectionid/:passengerid", async (req, res) => {
            try {
                const classid = req.params.classid;
                const sectionid = req.params.sectionid;
                const passengerid = req.params.passengerid;
                const results = await pool.query(`
                    WITH passengers_to_update AS (
                        SELECT id
                        FROM public.passengers
                        WHERE id = $3 AND EXISTS (
                            SELECT 1
                            FROM jsonb_array_elements(schedule) AS s
                            WHERE (s->>'classid')::text = $1 AND (s->>'sectionid')::text = $2
                        )
                    )
                    UPDATE public.passengers AS p
                    SET schedule = (
                        SELECT jsonb_agg(i)
                        FROM jsonb_array_elements(p.schedule) i
                        WHERE NOT (i->>'classid' = $1::text AND i->>'sectionid' = $2::text)
                    )
                    WHERE p.id IN (SELECT id FROM passengers_to_update);
            `, [classid, sectionid, passengerid]);
        
                res.status(200).send(results);
            } catch (error) {
                console.error('Error while updating schedule:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}

export default new SchedulerRoutes().router;